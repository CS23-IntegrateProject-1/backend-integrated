import { PrismaClient } from "@prisma/client";

class screenService {
    getAllScreens(): Promise<any> {
        const prisma = new PrismaClient();
        return prisma.screens.findMany();
    }
}

export default new screenService();