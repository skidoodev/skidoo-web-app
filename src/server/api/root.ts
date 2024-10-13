import { createTRPCRouter } from "@/server/api/trpc";
import { travelFormRouter } from "./routers/submitTravelForm";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  travel_form: travelFormRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
