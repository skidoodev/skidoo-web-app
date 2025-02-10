import { db } from "@/server/db";
import { travelForm } from "@/server/db/schema";
import { z } from "zod";
import { NextResponse } from 'next/server';
import { sendTravelFormEmail } from "../send/route";

const travelFormSchema = z.object({
  destination: z.string().min(1),
  startDate: z.number(),
  endDate: z.number(),
  adults: z.number().min(0),
  children: z.number().min(0),
  pets: z.number().min(0),
  seniors: z.number().min(0),
  description: z.string().optional(),
  travelerTypes: z.array(z.string()),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = travelFormSchema.parse(body);

    // Insert into database
    await db.insert(travelForm).values({
      ...validatedData,
      startDate: new Date(validatedData.startDate),
      endDate: new Date(validatedData.endDate)
    });

    await sendTravelFormEmail(validatedData);
    
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    // Specific error handling
    if (error instanceof Error) {
      console.error('Server error:', {
        message: error.message,
        name: error.name,
        cause: error.cause
      });
      
      return NextResponse.json({ 
        error: `Database error: ${error.message}` 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: 'Unknown error occurred' 
    }, { status: 500 });
  }
}