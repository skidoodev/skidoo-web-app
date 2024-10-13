import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { travelForm } from "@/server/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const travelFormRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        destination: z.string().min(1),
        startDate: z.string().min(1),
        endDate: z.string().min(1),
        adults: z.number().min(1),
        children: z.number().min(0),
        pets: z.number().min(0),
        seniors: z.number().min(0),
        description: z.string().optional(),
        travelerTypes: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(travelForm).values({
        id: createId(),
        destination: input.destination,
        startDate: input.startDate,
        endDate: input.endDate,
        adults: input.adults,
        children: input.children,
        pets: input.pets,
        seniors: input.seniors,
        description: input.description ?? "",
        travelerTypes: input.travelerTypes,
      });

      return { message: "Travel form submitted successfully!" };
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.travelForm.findFirst({
      orderBy: (travelForm, { desc }) => [desc(travelForm.startDate)],
    });
  }),
});
