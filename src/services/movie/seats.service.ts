import { PrismaClient } from "@prisma/client";

class seatService {
  // getSeatType = async () => {
  //     const prisma = new PrismaClient();
  //     const data = await prisma.seats.findMany({
  //         // where: {
  //         //     screenId: screenId
  //         // }
  //     });
  //     return data;
  // }

  async getSeatById(id: number): Promise<any[]> {
    const prisma = new PrismaClient();
    const data = await prisma.seats.findMany({});
    return data;
  }

  async getSeatByScreenId(id: number): Promise<any[]> {
    const prisma = new PrismaClient();
    console.log(id);
    const data = await prisma.seats.findMany({
      where: {
        screenId: id,
      },
    });
    return data;
  }

  async getAllSeats(): Promise<any[]> {
    const prisma = new PrismaClient();
    const data = await prisma.seats.findMany();
    return data;
  }

  async getAllSeatTypes(): Promise<any[]> {
    const prisma = new PrismaClient();
    const data = await prisma.seat_types.findMany();
    return data;
  }
  async getSeatByShowId(id: number): Promise<any[]> {
    const prisma = new PrismaClient();
    const data = await prisma.shows.findMany({
      where: {
        showId: id,
      },
      include: {
        Films: true,
        Screens: {
          include: {
            Seats: {
              include: {
                Seat_types: true,
              },
            },
          },
        },
      },
    });
    return data;
  }
}

export default new seatService();
