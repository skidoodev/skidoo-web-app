import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { NextResponse } from 'next/server';

// Create a new Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Create a new ratelimiter that allows 5 requests per day
// Different rate limits for development vs production
const isDevelopment = process.env.NODE_ENV === "development";
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    isDevelopment ? 100 : 5, // 100 requests in dev, 5 in production
    "1 d"
  ),
  analytics: true,
});

export async function rateLimitRequest(userId: string) {
  // Apply rate limiting
  const { success, limit, reset, remaining } = await ratelimit.limit(userId);
  
  // If rate limit exceeded
  if (!success) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: 'Rate limit exceeded. Try again later.',
          limit,
          remaining: 0,
          reset, // reset is already a number in milliseconds
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    };
  }

  return {
    success: true,
    limit,
    remaining,
    reset
  };
}