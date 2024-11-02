// 1. Fixed user ID reference in travelFormRouter
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { travelForm, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const formInputSchema = z.object({
  destination: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  adults: z.number().min(1),
  children: z.number().min(0),
  pets: z.number().min(0),
  seniors: z.number().min(0),
  description: z.string().optional(),
  travelerTypes: z.array(z.string()).min(1),
})

const guestFormSchema = formInputSchema.extend({
  email: z.string().email(),
});

export const travelFormRouter = createTRPCRouter({
  createAsGuest: publicProcedure
    .input(guestFormSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(travelForm).values({
        destination: input.destination,
        startDate: input.startDate, // Date object is already handled by zod
        endDate: input.endDate,     // Date object is already handled by zod
        adults: input.adults,
        children: input.children,
        pets: input.pets,
        seniors: input.seniors,
        description: input.description ?? "",
        travelerTypes: input.travelerTypes,
        email: input.email,
      });
      
      return { message: "Travel form submitted successfully!" };
    }),

  create: protectedProcedure
    .input(formInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Get the user first to ensure they exist and get their internal ID
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.clerkId, ctx.session.userId))
        .get();

      if (!user) {
        throw new Error("User not found");
      }

      await ctx.db.insert(travelForm).values({
        destination: input.destination,
        startDate: input.startDate,
        endDate: input.endDate,
        adults: input.adults,
        children: input.children,
        pets: input.pets,
        seniors: input.seniors,
        description: input.description ?? "",
        travelerTypes: input.travelerTypes,
        userId: user.id, // Use the internal user.id, not the clerkId
      });
      
      return { message: "Travel form submitted successfully!" };
    }),
});