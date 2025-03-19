import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { generateItineraryPrompt } from "@/utils/itineraryPrompt";
import { rateLimitRequest } from "@/lib/rate-limiter";
import { getAuth } from "@clerk/nextjs/server"; 
import { auth } from "@clerk/nextjs/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Correct authentication method for API routes
    const { userId } = await auth();

    if (!userId) {
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
        { role: "system", content: "You are a helpful travel assistant that creates detailed itineraries." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    // Extract generated itinerary
    const itinerary =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate an itinerary at this time. Please try again.";

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
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { message: "Failed to generate itinerary", error: error.message },
      { status: 500 }
    );
  }
}
