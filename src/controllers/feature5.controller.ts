import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature5Client = new PrismaClient();

export const getfeature5 = async (req: Request, res: Response) => {};

export const getAdvertisement = async (req: Request, res: Response) => {
    try {
            const allAdvertisements = await feature5Client.advertisement.findMany();
            res.status(200).json(allAdvertisements);
            
    } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Failed to retrieve data' });
          }
};
// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };