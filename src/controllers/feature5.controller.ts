import {PrismaClient} from "@prisma/client";
import { Response, Request } from "express";
import { adinfo } from "../interface/Auth/Advertisement";
import { voucherinfo } from "../interface/Auth/Voucher";
import { Promotioninfo } from "../interface/Auth/Promotion"; 
import authService from "../services/auth/auth.service";

const feature5Client = new PrismaClient();

export const getfeature5 = async (req: Request, res: Response) => {
    res.status(200).json({message: 'This is Feature5'});
};

//-----------------------------Advertisement-----------------------------------
export const AdBusiness = async (req: Request, res: Response) => {
    try {
        const { businessId } = authService.decodeToken(req.cookies.authToken);
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
                businessId,
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
        console.log(err);
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
};


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

export const GetAllAdvertisement = async (req: Request, res: Response) => {
    const { businessId } = authService.decodeToken(req.cookies.authToken);
    try {
        const GetAllAd = await feature5Client.ad_business.findMany({
            where: {businessId},
            
        })
        res.json(GetAllAd)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const GetInprogressAdvertisement = async (req: Request, res: Response) => {
    try {
        const GetInprogressAd = await feature5Client.ad_business.findMany({
            where: {isApprove: "In_progress"},
            
        })
        res.json(GetInprogressAd)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const GetAllCompleteAdvertisement = async (req: Request, res: Response) => {
    try {
        const GetallCompleteAd = await feature5Client.ad_business.findMany({
            where: {isApprove: "Completed"},
            
        })
        res.json(GetallCompleteAd)
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


//----------------------------Voucher-----------------------------
export const Voucher = async (req: Request, res: Response) => {
    try {
		// const newVch: voucherinfo = req.body;
		const {

			voucherName: voucher_name ,
			voucherImage: voucher_image,
			startDate: start_date ,
			endDate: end_date ,
			description,
			point_use,
			// voucherType: Vouchertype,
			
		} = req.body;

        const isApprove = "In_progress";

        // const {
        //     voucher_name: voucherName,
        //     voucher_image: voucherImage,
        //     start_date: startDate,
        //     end_date: endDate,
        //     description,
        //     point_use
        // } = newVch;

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

            // await feature5Client.user_voucher.create({

            // })
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
        const { id } = req.params; 

        const discountVoucher = await feature5Client.discount_voucher.findUnique({
            where: { voucherId: parseInt(id) }
        });

        const foodVoucher = await feature5Client.food_voucher.findUnique({
            where: { voucherId: parseInt(id) }
        });

        if (discountVoucher) {
            await feature5Client.discount_voucher.delete({
                where: { voucherId: parseInt(id) }
            });
        }

        if (foodVoucher) {
            await feature5Client.food_voucher.delete({
                where: { voucherId: parseInt(id) }
            });
        }

        const DeleteAd = await feature5Client.voucher.delete({
            where: { voucherId: parseInt(id) }
        });

        res.json(DeleteAd);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

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

export const GetallVenue = async (req: Request, res: Response) => {
    const { businessId } = authService.decodeToken(req.cookies.authToken);
    try {
        const getvenue = await feature5Client.property.findMany({
            where: {businessId},
            include: {venue: true}
        })
        res.json(getvenue)

    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}


export const GetAllVoucher = async (req: Request, res: Response) => {
    try {

        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature5Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        if (venueId == undefined || !venueId) {
            return res.status(400).json({ error: "Venue is undefined" });
        }

        const GetAllVoucher = await feature5Client.voucher.findMany({
            where: {venueId: venueId}
            
        })

        res.json(GetAllVoucher);

    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}

export const GetInfomationOfVoucher = async (req: Request, res: Response) => {
    const{id} = req.params
    try {
        const GetInfoVoucher = await feature5Client.voucher.findMany({
            where: {voucherId: parseInt(id)},
   
        })
        res.json(GetInfoVoucher)

    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}


//--------------------------------Membertier----------------------------------
export const GettierName = async (req: Request, res: Response) => {
    const { userId } = authService.decodeToken(req.cookies.authToken);
  try {
    const gettierName = await feature5Client.user.findUnique({
      where: { userId: userId },
      select: {
        tier: {
          select: {
            tier_name: true,
            // tier_benefit: true,
          },
        },
      },
    });
    res.json(gettierName);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetInfoMembertier = async (req: Request, res: Response) => {
    const { userId } = authService.decodeToken(req.cookies.authToken);
  try {
    const GetInfoMembertier = await feature5Client.user.findUnique({
      where: { userId: userId },
      select: {
        tier: {
          select: {
            tier_name: true,
            tier_benefit: true,
          },
        },
      },
    });
    res.json(GetInfoMembertier);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};


export const GetMyReward = async (req: Request, res: Response) => {
    const { userId } = authService.decodeToken(req.cookies.authToken);
    const { id }= req.body;
    console.log(userId)
    try {
      const GetMyReward = await feature5Client.user_voucher.create({
        data: {
            userId: userId, 
            voucherId: id 
        }
      });
      res.json(GetMyReward);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ error: error.message });
    }
};


export const GetTodayPrivillage = async (req: Request, res: Response) => {
  const { userId } = authService.decodeToken(req.cookies.authToken);

  try {
    const GetTodayPrivillage = await feature5Client.voucher.findMany({
      where: {
        User_voucher: {
          every: {
            userId: userId,
          },
        },
        start_date: {
          lte: new Date(),
        },
        end_date: {
          gte: new Date(),
        },
      },
    });
    res.json(GetTodayPrivillage);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const Getpointused = async (req: Request, res: Response) => {
    const { userId } = authService.decodeToken(req.cookies.authToken);
  
    try {
      const Getpointused = await feature5Client.point.findUnique({
        where: {
           pointId: userId,
        },
        select:{
            amount_used: true
        }
      });
      res.json(Getpointused);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ error: error.message });
    }
  };


//------------------------------Promotion-----------------------------------
 
export const Promotion = async (req: Request, res: Response) => {
    try {
        // const isApprove = "In_progress"
        // const menuIds : number[] = req.body.menuIds;
        const newAd: Promotioninfo = req.body;
        const {name,
            description,
            image_url,
            start_date,
            end_date,
            discount_price
        } = newAd;

        const { menuId , venueId} = req.body;
        
        const newPromotion = await feature5Client.promotion.create({
            data: {
                name,
                description,
                image_url,
                start_date,
                end_date,
                discount_price,
                menuId, 
                venueId
                
            }
        })

        res.json(newPromotion);
    } catch(err) {
        console.log(err);
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
};

export const DeletePromotion = async (req: Request, res: Response) => {
    try {

        const {id} = req.params;
        const deletepromotion = await feature5Client.promotion.delete({
            where: {promotionId: parseInt(id)}
        })

        res.json(deletepromotion);
    } catch(err) {
        console.log(err);
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
};

export const PromotionApprove = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const { isApprove } = req.body;
        const ApproveVoucher = await feature5Client.promotion.update({
            where: {promotionId: parseInt(id)},
            data: {isApprove}
        })
        res.json(ApproveVoucher)
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
}


export const getAllPromotion = async (req: Request, res: Response) => {
    try {
        // const { businessId } = authService.decodeToken(req.cookies.authToken);

        // const getVenueId = await feature5Client.property.findFirst({
        //     where: {
        //         businessId: businessId,
        //     },
        //     select: {
        //         venueId: true,
        //     },
        // });

        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature5Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        if (venueId == undefined || !venueId) {
            return res.status(400).json({ error: "Venue is undefined" });
        }
        const getallPromotion = await feature5Client.promotion.findMany({
            where: {venueId: venueId}
            
        })

        res.json(getallPromotion);
    } catch(err) {
        console.log(err);
        const error = err as Error;
        res.status(500).json({ error: error.message});
    }
};

    







