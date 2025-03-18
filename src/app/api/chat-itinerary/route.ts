import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, currentItinerary, destination, duration } = body;

    if (!message || !currentItinerary) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a system prompt that instructs the AI how to respond
    const systemPrompt = `
You are an AI travel assistant helping a user modify their travel itinerary for ${destination} (${duration} days).
The user will ask for changes or additions to their itinerary.

Here's how you should respond:
1. If the user asks for modifications to the itinerary, provide a helpful response AND return an updated version of the full itinerary.
2. If the user asks a question about the destination but doesn't request changes, provide information without modifying the itinerary.
3. Always maintain the same format and structure as the original itinerary.
4. Be concise in your chat response, but detailed in the itinerary.

Current itinerary:
${currentItinerary}
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    // Extract the response
    const aiResponse = completion.choices[0]?.message?.content || 
      "Sorry, I couldn't process your request. Please try again.";

    // Check if the response contains an updated itinerary
    // We'll use a simple heuristic: if the response is long and contains "Day 1", it's likely an itinerary
    const containsItinerary = aiResponse.length > 200 && aiResponse.includes("Day 1");
    
    let chatMessage = aiResponse;
    let updatedItinerary = null;

    if (containsItinerary) {
      // If the response seems to be a full itinerary, separate it
      updatedItinerary = aiResponse;
      
      // Generate a short message about the changes
      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "Summarize the changes made to the itinerary in 1-2 sentences only." 
          },
          { 
            role: "user", 
            content: `Original itinerary: ${currentItinerary}\nUpdated itinerary: ${updatedItinerary}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      });
      
      chatMessage = summaryResponse.choices[0]?.message?.content || 
        "I've updated your itinerary based on your request.";
    }

    return NextResponse.json({
      message: chatMessage,
      updatedItinerary
    });
  } catch (error: any) {
    console.error('Error processing chat:', error);
    return NextResponse.json(
      { 
        message: 'Failed to process your request',
        error: error.message 
      },
      { status: 500 }
    );
  }
}