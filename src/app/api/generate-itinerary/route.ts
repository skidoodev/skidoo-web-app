import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateItineraryPrompt } from '@/utils/itineraryPrompt';

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destination, duration, budget, travelStyle, preferences } = body;

    if (!destination || !duration || !budget || !travelStyle) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate the prompt using our utility function
    const prompt = generateItineraryPrompt(
      destination,
      duration,
      budget,
      travelStyle,
      preferences || ''
    );

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo" depending on your needs and budget
      messages: [
        { role: "system", content: "You are a helpful travel assistant that creates detailed itineraries." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    // Extract the generated itinerary
    const itinerary = completion.choices[0]?.message?.content || 
      "Sorry, I couldn't generate an itinerary at this time. Please try again.";

    return NextResponse.json({
      itinerary,
      destination,
      duration
    });
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { 
        message: 'Failed to generate itinerary',
        error: error.message 
      },
      { status: 500 }
    );
  }
}