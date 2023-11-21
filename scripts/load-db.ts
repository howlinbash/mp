import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hotelNames = ["A", "B", "C", "D", "E"];
const channelNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function main() {
  const hotelPromises = hotelNames.map(async (identifier) =>
    prisma.hotel.create({ data: { name: "Hotel " + identifier } })
  );

  const channelPromises = channelNames.map(async (identifier) =>
    prisma.channel.create({
      data: { name: "Channel " + String(identifier), number: identifier },
    })
  );

  const hotels = await Promise.all(hotelPromises);
  const channels = await Promise.all(channelPromises);

  for (const hotel of hotels) {
    for (const channel of channels) {
      await prisma.hotelChannel.create({
        data: {
          hotel: {
            connect: { id: hotel.id },
          },
          channel: {
            connect: { id: channel.id },
          },
          active: false,
        },
      });
    }
  }

  if (hotels.length && hotels[0]) {
    await prisma.ui.create({ data: { hotelId: hotels[0].id } });
  }

  console.log("Records created successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    void prisma.$disconnect();
  });
