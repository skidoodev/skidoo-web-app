import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { travelForm } from "@/server/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const travelFormRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        destination: z.string().min(1),
        startDate: z.date(),
        endDate: z.date(),
        adults: z.number().min(1),
        children: z.number().min(0),
        pets: z.number().min(0),
        seniors: z.number().min(0),
        description: z.string().optional(),
        travelerTypes: z.array(z.string()).min(1),
        email: z.string().email()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(travelForm).values({
        destination: input.destination,
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
        adults: input.adults,
        children: input.children,
        pets: input.pets,
        seniors: input.seniors,
        description: input.description ?? "",
        travelerTypes: input.travelerTypes,
        email: input.email
      });

      //TODO: should fire email to hello@theskidoo.com with all the input data

      return { message: "Travel form submitted successfully!" };
    }),
});
