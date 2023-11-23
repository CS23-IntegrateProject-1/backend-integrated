import { PrismaClient } from "@prisma/client";

class theaterService{
    getAllTheaters(): Promise<any[]> {
        const prisma = new PrismaClient();
        const data = prisma.theaters.findMany();
        return data;
    }

    

    
    
}

export default new theaterService();