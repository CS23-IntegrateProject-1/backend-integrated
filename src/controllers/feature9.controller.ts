import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature9Client = new PrismaClient();

export const getfeature9 = async (req: Request, res: Response) => {
    
};

export const GetMembertier = async (req: Request, res: Response) =>{
    const{id} = req.params;
    try {
        const getMembertier = await feature9Client.user.findUnique({
            where: {userId: parseInt(id)},
            select: {
                tier: {
                    select:{ 
                    tier_name: true,
                    tier_benefit: true
                    }
                }
            }
        })
        res.json(getMembertier)

    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

// export const GetTodayPrivillage = async (req: Request, res: Response) =>{
//     const{id} = req.params;
//     try {
//         const GetTodayPrivillage = await feature9Client.user.findUnique({
//             where: {userId: parseInt(id)},
//             select: {
//                 tier: {
//                     select:{ 
//                     tier_name: true,
//                     tier_benefit: true
//                     }
//                 }
//             }
//         })
//         res.json(getMembertier)

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({ error: error.message});
//     }
// }

// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };