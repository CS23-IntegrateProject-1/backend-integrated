import { PrismaClient } from "@prisma/client";

class seatService{
    // getSeatType = async () => {
    //     const prisma = new PrismaClient();
    //     const data = await prisma.seats.findMany({
    //         // where: {
    //         //     screenId: screenId
    //         // }
    //     });
    //     return data;
    // }

    // getSeatByRowAndColumn = async (screenId: number, row: number, column: number) => {
    //     const prisma = new PrismaClient();
    //     const data = await prisma.seats.findUnique({
    //         where: {
    //             screenId_row_column: {
    //                 screenId: screenId,
    //                 row: row,
    //                 column: column
    //             }
    //         }
    //     });
    //     return data;
    // }
    // async getSeatByScreenId(id: number) : Promise<any[]> {
    //     const prisma = new PrismaClient();
    //     const data = await prisma.seats.findMany({
    //         where: {
    //             screenId: id
    //         }
    //     });
    //     return data;
    // }
    async getSeatByScreenId(id: number) : Promise<any[]> {
        const prisma = new PrismaClient();
        console.log(id);
        const data = await prisma.seats.findMany({
            where: {
                screenId: id
            }
        });
        return data;
    }

}

export default new seatService();