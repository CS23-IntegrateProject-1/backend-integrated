import { PrismaClient } from "@prisma/client";

class showService{
    getShowsByFilmId(id: number, date: string): Promise<any[]> {
        const prisma = new PrismaClient();
        const data = prisma.shows.findMany({
            where: {
                filmId: id,
                date: new Date(date),
            },
            include: {
                screen: {
                    include: {
                        theater: true
                    }
                },
                film: true
            },
        });
        return data;
    }

    getShowsByTheaterId(id: number, date: string): Promise<any[]> {
        const prisma = new PrismaClient();
        const data = prisma.shows.findMany({
            where: {
                screen: {
                    theaterId: id,
                },
                date: new Date(date),
            },
            include: {
                screen: {
                    include: {
                        theater: true
                    }
                },
                film: true
            },
        });
        return data;
    }
}

export default new showService();