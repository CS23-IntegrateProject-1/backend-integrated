import { PrismaClient } from "@prisma/client";

class reservationService {
  async getTotalPriceByReservationId(id: number) {
    const prisma = new PrismaClient();
    const priceModifierData = await prisma.reservation_logs.findUnique({
      where: { reservationId: id },
      select: {
        showId: true,
        seatId: true,
        userId: true,
        Seats: {
          select: {
            Seat_types: {
              select: {
                price_modifier: true,
              }
            }
          }
        },
      },
    });
    const priceModifier =
      Number(priceModifierData?.Seats.Seat_types.price_modifier) || 0;
    const priceData = await prisma.reservation_logs.findUnique({
      where: { reservationId: id },
      select: {
        showId: true,
        seatId: true,
        userId: true,
        Shows: {
          select: {
            price: true,
          },
        },
      },
    });
    const price = Number(priceData?.Shows.price) || 0;
    const totalPrice = priceModifier * price;

    return totalPrice;
  }

  async getReservationById(id: number) {
    const prisma = new PrismaClient();
    const data = await prisma.reservation_logs.findUnique({
      where: { reservationId: id },
      include: {
        Shows: {
          include: {
            Films: true,
            Screens: {
              include: {
                Theaters: true,
              },
            },
          },
        },
        Seats: {
          include: {
            Seat_types: true,
          },
        },
      },
      
      // select: {
      //   reservationId: true,
      //   showId: true,
      //   seatId: true,
      //   userId: true, 
      // },
    });
    return data;
  }
}

export default new reservationService();
