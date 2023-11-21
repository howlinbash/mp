import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const hotelRouter = createTRPCRouter({
  getHotels: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.hotel.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
