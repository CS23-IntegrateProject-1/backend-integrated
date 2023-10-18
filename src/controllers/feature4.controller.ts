import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature4Client = new PrismaClient();

export const getfeature4 = async (req: Request, res: Response) => {
    
};


// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };