import { db } from "@/server/db";
import { travelForm } from "@/server/db/schema";
import { z } from "zod";

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

    // Validate incoming data
    const validatedData = travelFormSchema.parse(body);

    // Insert into database
    await db.insert(travelForm).values({
      ...validatedData,
      startDate: new Date(validatedData.startDate),
      endDate: new Date(validatedData.endDate),
    });

    return new Response(
      JSON.stringify({ message: "Form submitted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ message: "Validation failed", errors: error.errors }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
