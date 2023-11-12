import { Customer_type, Prisma, PrismaClient, Target_group } from "@prisma/client";
import { Response, Request } from "express";
import { createdAdBusiness } from "../services/testService";
// const bcrypt = require('bcrypt')

const feature5Client = new PrismaClient();

export const getfeature5 = async (req: Request, res: Response) => {
    res.status(200).json({message: 'This is Feature5'});
};

type adinfo = {
    name: string;
    description: string;
    image_url: string;
    start_date: Date;
    end_date: Date;
    cost: number;
    customer_type: Customer_type;
    target_group: Target_group;
    businessId: number;
}

export const AdBusiness = async (req: Request, res: Response) => {
    console.log("first")
    try {
        const {name,
            description,
            image_url,
            start_date,
            end_date,
            cost,
            customer_type,
            target_group,
        } = req.body;

        const {id} = req.params;
        const businessId = parseInt(id);
        const adParams: adinfo = {
            name : name,
            description : description,
            image_url : image_url,
            start_date : start_date,
            end_date : end_date,
            cost : cost,
            customer_type : customer_type,
            target_group : target_group,
            businessId : businessId
        }
        
        const ad = await createdAdBusiness(adParams);
        if (!ad){
            res.status(404).json({ error: "not success"})
        }
        res.json({ message: 'add successfully', ad});

    } catch(err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
    

};

export const AdminApprove = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const { isApprove } = req.body;
        const ApproveAd = await feature5Client.ad_business.update({
            where: {advertisementId: parseInt(id)},
            data: {isApprove}
        })
        res.json(ApproveAd)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}


   // try {
    //     console.log("Hello world!");
    //     const allAdvertisements = await feature5Client.ad_business.findMany();
    //     res.status(200).json(allAdvertisements);
            
    // } catch (e) {
    //     console.log(e);
    //     res.status(500).json({ error: 'Failed to retrieve data' });
    // } 



export const getUser = async (req: Request, res: Response) => {  
    try {
        // console.log("Hello world!");
        const allUsers = await feature5Client.user.findMany();
        res.status(200).json(allUsers);
            
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

