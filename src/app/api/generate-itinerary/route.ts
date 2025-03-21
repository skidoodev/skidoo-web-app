import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { generateItineraryPrompt } from "@/utils/itineraryPrompt";
import { rateLimitRequest } from "@/lib/rate-limiter";
import { auth, currentUser } from "@clerk/nextjs/server";
import { logUserAction } from "@/lib/logging";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Correct authentication method for API routes
    const { userId } = await auth();
    const user = await currentUser();
    const userName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Anonymous User';
    const userEmail = user?.emailAddresses?.[0]?.emailAddress || undefined;
    
    if (!userId) {
      await logUserAction(
        'error', 
        { 
          message: 'Authentication required',
          path: '/api/generate-itinerary'
        },
        undefined,
        undefined,
        undefined
      );
      
      return NextResponse.json(
        { 
          error: "Authentication required",
          message: "Please sign in to generate itineraries. Creating an itinerary requires a free account."
        },
        { status: 401 }
      );
    }

    // Apply rate limiting using the user's ID
    const rateLimitResult = await rateLimitRequest(userId);
    if (!rateLimitResult.success) {
      // Log rate limit exceeded
      await logUserAction(
        'rate_limit_exceeded',
        {
          remainingTime: rateLimitResult.reset,
          path: '/api/generate-itinerary'
        },
        userId,
        userName,
userEmail || undefined
      );
      
      // Return a user-friendly rate limit response without minutes
      return NextResponse.json({
        error: "Rate limit exceeded",
        message: "You've reached your daily limit of 5 itinerary generations. Please try again tomorrow."
      }, { status: 429 });
    }

    const { limit, remaining, reset } = rateLimitResult;

    const body = await request.json();
    const { destination, duration, budget, travelStyle, preferences } = body;

    if (!destination || !duration || !budget || !travelStyle) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log the itinerary generation request
    await logUserAction('generate_itinerary', {
      destination,
      duration,
      budget,
      travelStyle,
      hasPreferences: !!preferences
    }, userId, userName, userEmail || undefined);

    // Generate prompt
    const prompt = generateItineraryPrompt(
      destination,
      duration,
      budget,
      travelStyle,
      preferences || ""
    );

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: `You are a helpful travel assistant that creates detailed itineraries for ${userName}.` },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    // Extract generated itinerary
    const itinerary =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate an itinerary at this time. Please try again.";

    // Log successful generation
    await logUserAction('generate_itinerary', {
      success: true,
      destination,
      duration,
      remainingRequests: remaining
    }, userId, userName, userEmail);

    // Create response with rate limit headers
    const response = NextResponse.json({
      itinerary,
      destination,
      duration,
      rateLimit: { limit: limit ?? 0, remaining: remaining ?? 0, reset }
    });

    response.headers.set("X-RateLimit-Limit", (limit ?? 0).toString());
    response.headers.set("X-RateLimit-Remaining", (remaining ?? 0).toString());
    response.headers.set("X-RateLimit-Reset", (reset ?? 0).toString());

    return response;
  } catch (error: any) {
    // Get the userId and userName if available, or use undefined
    //const errorUserId = typeof userId !== 'undefined' ? userId : undefined;
    //const errorUserName = typeof userName !== 'undefined' ? userName : undefined;
    //const errorUserEmail = typeof userEmail !== 'undefined' ? userEmail : undefined;
    
    // Log error
    // await logUserAction(
    //   'error',
    //   {
    //     message: error.message,
    //     path: '/api/generate-itinerary'
    //   },
    //   //errorUserId,
    //     undefined,
    //   errorUserName,
    //   errorUserEmail
    //);
    
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { message: "Failed to generate itinerary", error: error.message },
      { status: 500 }
    );
  }
}
