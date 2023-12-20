import { PrismaClient } from "@prisma/client";

class showService{
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
                        Theaters: true
                    }
                },
                Films: true
            },
        });
        return data;
    }

    getShowsByTheaterId(id: number, date: string): Promise<any[]> {
        const prisma = new PrismaClient();
        const data = prisma.shows.findMany({
            where: {
                Screens: {
                    theaterId: id,
                },
                date: new Date(date),
            },
            include: {
                Screens: {
                    include: {
                        Theaters: true
                    }
                },
                Films: true
            },
        });
        return data;
    }
}

export default new showService();