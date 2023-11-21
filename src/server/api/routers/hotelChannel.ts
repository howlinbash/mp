import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const hotelChannelRouter = createTRPCRouter({
  getHotelChannels: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const channels = await ctx.db.hotelChannel.findMany({
        where: {
          hotelId: input.id,
        },
        include: {
          channel: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          channel: {
            number: "asc",
          },
        } as const,
      });
      return channels;
    }),

  toggle: publicProcedure
    .input(
      z.object({
        active: z.boolean(),
        channelId: z.number(),
        hotelId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { active, channelId, hotelId } = input;
      const toggle = await ctx.db.hotelChannel.update({
        where: {
          hotelId_channelId: {
            hotelId,
            channelId,
          },
        },
        data: {
          active,
        },
      });

      return toggle;
    }),
});
