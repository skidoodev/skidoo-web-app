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
  email: z.string().email(),
});

export const travelFormRouter = createTRPCRouter({
  createAsGuest: publicProcedure
    .input(formInputSchema)
    .mutation(async ({ ctx, input }) => {
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
        email: input.email,
      });
      
      return { success: true, message: "Travel form submitted successfully!" };
    }),

  create: protectedProcedure
    .input(formInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.userId;
        
        if (!userId) {
          throw new Error("User not authenticated");
        }

        const user = await ctx.db
          .select()
          .from(users)
          .where(eq(users.clerkId, userId))
          .get();

        if (!user) {
          const newUser = await ctx.db.insert(users).values({
            clerkId: userId,
            email: input.email,
            emailVerified: true,
          }).returning().get();

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
            userId: newUser.id,
            email: input.email,
          });

        } else {
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
            userId: user.id,
            email: input.email,
          });
        }
        
        return { success: true, message: "Travel form submitted successfully!" };
      } catch (error) {
        console.error("Error in create mutation:", error);
        throw error;
      }
    }),
});