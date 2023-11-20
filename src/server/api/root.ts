import { hotelRouter } from "~/server/api/routers/hotel";
import { hotelChannelRouter } from "~/server/api/routers/hotelChannel";
import { uiRouter } from "~/server/api/routers/ui";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  hotel: hotelRouter,
  hotelChannel: hotelChannelRouter,
  ui: uiRouter,
});

export type AppRouter = typeof appRouter;
