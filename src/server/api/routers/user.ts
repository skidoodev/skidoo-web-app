import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.clerkId, ctx.session.userId))
        .get();

      return user;
    }),

  getUserById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db
        .select({
          id: users.id,
          username: users.username,
          imageUrl: users.imageUrl,
        })
        .from(users)
        .where(eq(users.clerkId, input.userId))
        .get();

      return user;
    }),
});