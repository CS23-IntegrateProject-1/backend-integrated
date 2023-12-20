import { PrismaClient } from "@prisma/client";

class showService {
  getShowById(id: number) {
    const prisma = new PrismaClient();
    const data = prisma.shows.findUnique({
      where: {
        showId: id,
      },
      include: {
        Screens: {
          include: {
            Theaters: true,
          },
        },
        Films: true,
      },
    });
  }

  getShowsByFilmId(id: number): Promise<any[]> {
    const prisma = new PrismaClient();
    const data = prisma.shows.findMany({
      where: {
        filmId: id,
        // date: new Date(date),
      },
      include: {
        Screens: {
          include: {
            Theaters: true,
          },
        },
        Films: true,
      },
    });
    return data;
  }

  getShowsByTheaterId(
    id: number,
    date: number,
    month: number,
    year: number
  ): Promise<any[]> {
    const prisma = new PrismaClient();
    const dateString = date < 10 ? "0" + date : date.toString();
    const monthString = month < 10 ? "0" + month : month.toString();
    const queryDate = new Date(
      year + "-" + monthString + "-" + dateString
    ).toISOString();
    console.log(queryDate);

    const data = prisma.shows.findMany({
      where: {
        Screens: {
          theaterId: id,
        },
        date: queryDate,
      },
      include: {
        Screens: {
          include: {
            Theaters: true,
          },
        },
        Films: true,
      },
    });
    return data;
  }

  getAllShows(): Promise<any[]> {
    const prisma = new PrismaClient();
    const data = prisma.shows.findMany();
    return data;
  }
}

export default new showService();
