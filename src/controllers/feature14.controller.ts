import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature14Client = new PrismaClient();

export const getfeature14 = async (req: Request, res: Response) => {
    
};
//=====================================ADMIN======================================
export const createAdminUser = async (req: Request, res: Response) => {
    const { username, hashed_password} = req.body;
    try{
        const admin_user = await feature14Client.admin_user.create({
            data: {
                username: username,
                hashed_password: hashed_password,
            },
        });
        return res.status(201).json({ admin_user });
    } catch (error) {
        return res.sendStatus(500).json({ error });
    }
}

export const getAdminUser = async (req: Request, res: Response) => {
    try {
        const admin_user = await feature14Client.admin_user.findMany();
        return res.status(200).json({ admin_user });
    } catch (error) {
        return res.status(500).json({ error });
    }
}


export const updateAdminUser = async (req: Request, res:Response) => {
    const { adminId } = req.params;
    const  { username, hashed_password} = req.body;
    try{
        const admin_user = await feature14Client.admin_user.update({
            where: {
                adminId: parseInt(adminId),
            },
            data: {
                username: username,
                hashed_password: hashed_password,
            },
        });
        return res.status(201).json({ admin_user });
    } catch (error) {
        return res.sendStatus(500).json({ error });
    }
}
 //===============================BusinessUser==============================
export const createBusinessUser = async (req:Request, res:Response) => {
    const { username , hashed_password } = req.body;
    try {
        const business_user = await feature14Client.business_user.create({
            data: {
                username: username,
                hashed_password: hashed_password,
            },
        });
        return res.status(201).json({ business_user });
    } catch(error) {
        return res.sendStatus(500).json({ error });
    }
};

export const getBusinessUser = async (req: Request, res:Response) => {
    try {
        const business_user = await feature14Client.business_user.findMany();
        return res.status(200).json({ business_user });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
export const updateBusinessUser = async (req:Request, res:Response) => {
    const { businessId } = req.params;
    const { username , hashed_password, } = req.body;
    try{
        const business_user = await feature14Client.business_user.update({
            where:{
                businessId: parseInt(businessId),
            },
            data: {
                username: username,
                hashed_password: hashed_password,
            },
        });
        return res.status(201).json({ business_user });
    } catch (error){
        return res.sendStatus(500).json({ error });
    }
}


// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };

