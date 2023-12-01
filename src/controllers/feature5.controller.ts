import { Customer_type, Prisma, PrismaClient, Target_group } from "@prisma/client";
import { Response, Request } from "express";


const feature5Client = new PrismaClient();

export const getfeature5 = async (req: Request, res: Response) => {
    res.status(200).json({message: 'This is Feature5'});
};

enum isApprove {
    Rejected = "Rejected",
    In_progress = "In_progress",
    Completed = "Completed"
}

interface adinfo {
    name: string;
    description: string;
    image_url: string;
    start_date: Date;
    end_date: Date;
    cost: number;
    isApprove: isApprove;
    customer_type: Customer_type;
    target_group: Target_group;
    businessId: number;
    
}

interface voucherinfo{
    voucher_name: string;
    voucher_image: string;
    start_date: Date;
    end_date: Date;
    description: string;
    point_use: number;
    venueId: number;
    isApprove: isApprove;
}

export const AdBusiness = async (req: Request, res: Response) => {
    try {
        
        const Tags: number[] = req.body.Tags;
        const isApprove = "In_progress"

        const newAd: adinfo = req.body;
        const {name,
            description,
            image_url,
            start_date,
            end_date,
            cost,
            customer_type,
            target_group,
        } = newAd;

        const {id} = req.params;

        const newAdvertisement = await feature5Client.ad_business.create({
            data: {
                name,
                description,
                image_url,
                start_date,
                end_date,
                cost,
                customer_type,
                target_group,
                businessId: parseInt(id),
                isApprove
            }
        })

        for(const tag of Tags){
            await feature5Client.ad_tag.create({
                data:{
                    adId: newAdvertisement.advertisementId,
                    tagId: tag
                }
            })
        }

        res.json(newAdvertisement);
    } catch(err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
};

// export const AdBusiness = async (req: Request, res: Response) => {
//     console.log("first")
//     try {
//         const {name,
//             description,
//             image_url,
//             start_date,
//             end_date,
//             cost,
//             customer_type,
//             target_group,
//         } = req.body;

//         const {id} = req.params;
//         const businessId = parseInt(id);
//         const adParams: adinfo = {
//             name : name,
//             description : description,
//             image_url : image_url,
//             start_date : start_date,
//             end_date : end_date,
//             cost : cost,
//             customer_type : customer_type,
//             target_group : target_group,
//             businessId : businessId
//         }
        
//         const ad = await createdAdBusiness(adParams);
//         if (!ad){
//             res.status(404).json({ error: "not success"})
//         }
//         res.json({ message: 'add successfully', ad});

//     } catch(err) {
//         const error = err as Error;
//         res.status(500).json({ error: error.message});
//     }
    

// };

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

export const DeleteAdvertisement = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        await feature5Client.ad_tag.deleteMany({
            where: { adId: parseInt(id) }
        })

        const DeleteAd = await feature5Client.ad_business.delete({
            where: {advertisementId: parseInt(id)},
            
        })
        res.json(DeleteAd)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const GetAllAdvertisement = async (req: Request, res: Response) => {
    try {
        const GetallAd = await feature5Client.ad_business.findMany({
            where: {isApprove: "In_progress"},
            
        })
        res.json(GetallAd)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const GetAllTags = async (req: Request, res: Response) => {
    try {
        const GetallAd = await feature5Client.a_tag.findMany();
        res.json(GetallAd)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const Voucher = async (req: Request, res: Response) => {
    try {
        const newVch: voucherinfo = req.body;
        const isApprove = "In_progress";

        const {
            voucher_name,
            voucher_image,
            start_date,
            end_date,
            description,
            point_use
        } = newVch;

        const {Vouchertype,id} = req.body;

        const newVoucher = await feature5Client.voucher.create({
            data:{
                voucher_name,
                voucher_image,
                start_date,
                end_date,
                description,
                point_use,
                venueId: parseInt(id),
                isApprove
            }
        })

        if(Vouchertype == "discount"){
            const {
                fix_discount,
                percent_discount,
                limitation,
                minimum_spend
            } = req.body;

            await feature5Client.discount_voucher.create({
                data:{
                    fix_discount,
                    percent_discount,
                    limitation,
                    minimum_spend,
                    voucherId: newVoucher.voucherId
                }
            })
        }

        if(Vouchertype == "food"){
            const {
                limitation,
                minimum_spend
            } = req.body;

            await feature5Client.food_voucher.create({
                data:{
                    limitation,
                    minimum_spend,
                    voucherId: newVoucher.voucherId
                }
            })
        }

        res.json(newVoucher)
        
    } catch (err) {
        // const error = err as Error;
        // res.status(500).json({ error: error.message});
        const error = err as Error & { code?: string };
        console.error('Prisma error:', error);
        res.status(500).json({ error: error.message });
    }
}

export const DeleteVoucher = async (req: Request, res: Response) => {
    try {
        // const {id} = req.params;
        const {Vouchertype,id} = req.body;

        if(Vouchertype == "discount"){
            await feature5Client.discount_voucher.delete({
                where: {voucherId: parseInt(id)}
            })
        }

        if(Vouchertype == "food"){
            await feature5Client.food_voucher.delete({
                where: {voucherId: parseInt(id)}
            })
        }
        
        const DeleteAd = await feature5Client.voucher.delete({
            where: {voucherId: parseInt(id)}
            
        })
        res.json(DeleteAd)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const VoucherApprove = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const { isApprove } = req.body;
        const ApproveVoucher = await feature5Client.voucher.update({
            where: {voucherId: parseInt(id)},
            data: {isApprove}
        })
        res.json(ApproveVoucher)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const GetallVenue = async (req: Request, res: Response) =>{
    const{id} = req.params;
    try {
        const getvenue = await feature5Client.property.findMany({
            where: {businessId: parseInt(id)},
            include: {venue: true}
        })
        res.json(getvenue)

    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}


// export const getUser = async (req: Request, res: Response) => {  
//     try {
//         // console.log("Hello world!");
//         const allUsers = await feature5Client.user.findMany();
//         res.status(200).json(allUsers);
            
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ error: 'Failed to retrieve data' });
//     }
// };

// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };

