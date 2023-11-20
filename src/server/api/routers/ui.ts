import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const uiRouter = createTRPCRouter({
  getCurrentHotel: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.ui.findFirst({
      select: {
        hotelId: true
      }
    });
  }),

  setHotel: publicProcedure
    .input(
      z.object({
        hotelId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { hotelId } = input;
      console.log({ hotelId });

      const onlyUi = await ctx.db.ui.findFirst();
      let newHotelId
      if (onlyUi) {
        newHotelId = await ctx.db.ui.update({
          where: {
            id: onlyUi.id
          },
          data: {
            hotelId,
          },
        });
      }

      return newHotelId;
    }),
});
