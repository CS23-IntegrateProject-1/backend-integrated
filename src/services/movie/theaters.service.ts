import { PrismaClient } from "@prisma/client";

class theaterService {
  getAllTheaters(): Promise<any[]> {
    const prisma = new PrismaClient();
    const data = prisma.theaters.findMany();
    return data;
  }

  getTheaterById(id: number): Promise<any> {
    const prisma = new PrismaClient();
    const data = prisma.theaters.findUnique({
      where: { theaterId: id },
    });
    return data;
  }
}

export default new theaterService();
