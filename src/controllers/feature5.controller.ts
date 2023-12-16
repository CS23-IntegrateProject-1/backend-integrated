import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { adinfo } from "../interface/Auth/Advertisement";
import { voucherinfo } from "../interface/Auth/Voucher";
import { Promotioninfo } from "../interface/Auth/Promotion";
import authService from "../services/auth/auth.service";
import { includes } from "ramda";

const feature5Client = new PrismaClient();

export const getfeature5 = async (req: Request, res: Response) => {
  res.status(200).json({ message: "This is Feature5" });
};

//-----------------------------Advertisement-----------------------------------
export const AdBusiness = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      return res.status(401).json({ error: "This user is not business user" });
    }
    const businessId = decodedToken.businessId;

    const Tags: number[] = req.body.Tags || [];
    const isApprove = "In_progress";

    const newAd: adinfo = req.body;
    const {
      name,
      description,
      image_url,
      start_date,
      end_date,
      cost,
      customer_type,
      target_group,
    } = newAd;
    const formattedStartDate = new Date(start_date);
    const formattedEndDate = new Date(end_date);
    const newAdvertisement = await feature5Client.ad_business.create({
      data: {
        name,
        description,
        image_url,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        cost: Number(cost),
        customer_type,
        target_group,
        businessId,
        isApprove,
      },
    });

    const Tag: number[] = req.body.Tags;
    if (!Array.isArray(Tags)) {
      return res.status(400).json({ error: "Tags must be an array" });
    }

    for (const tag of Tags) {
      await feature5Client.ad_tag.create({
        data: {
          adId: newAdvertisement.advertisementId,
          tagId: tag,
        },
      });
    }

    res.json(newAdvertisement);
  } catch (err) {
    // console.log(err);
    // const error = err as Error;
    // res.status(500).json({ error: error.message });
    const error = err as Error & { code?: string };
    console.error("Prisma error:", error);
    res.status(500).json({ err });
  }
};

export const DeleteAdvertisement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await feature5Client.ad_tag.deleteMany({
      where: { adId: parseInt(id) },
    });

    const DeleteAd = await feature5Client.ad_business.delete({
      where: { advertisementId: parseInt(id) },
    });
    res.json(DeleteAd);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getAdvertisementById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const ad = await feature5Client.ad_business.findFirst({
      where: {
        advertisementId: id,
      },
    });
    res.status(200).send(ad);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const AdminApprove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isApprove } = req.body;
    const ApproveAd = await feature5Client.ad_business.update({
      where: { advertisementId: parseInt(id) },
      data: { isApprove },
    });
    res.json(ApproveAd);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetAllAdvertisement = async (req: Request, res: Response) => {
  //for admin
  try {
    const GetAllAd = await feature5Client.ad_business.findMany();
    res.json(GetAllAd);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetInprogressAdvertisement = async (
  req: Request,
  res: Response
) => {
  try {
    const GetInprogressAd = await feature5Client.ad_business.findMany({
      where: { isApprove: "In_progress" },
    });
    res.json(GetInprogressAd);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetAllCompleteAdvertisement = async (
  req: Request,
  res: Response
) => {
  try {
    const GetallCompleteAd = await feature5Client.ad_business.findMany({
      where: { isApprove: "Completed" },
    });
    res.json(GetallCompleteAd);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetAllTags = async (req: Request, res: Response) => {
  try {
    const GetallAd = await feature5Client.a_tag.findMany();
    res.json(GetallAd);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

//----------------------------Voucher-----------------------------
export const Voucher = async (req: Request, res: Response) => {
  try {
    // const newVch: voucherinfo = req.body;
    const {
      voucherName: voucher_name,
      voucherImage: voucher_image,
      startDate: start_date,
      endDate: end_date,
      description,
      point_use,
      voucherType: Vouchertype,
    } = req.body;

    const isApprove = "In_progress";

    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      return res.status(401).json({ error: "This user is not business user" });
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

    // const {
    //     voucher_name: voucherName,
    //     voucher_image: voucherImage,
    //     start_date: startDate,
    //     end_date: endDate,
    //     description,
    //     point_use
    // } = newVch;

    // const {Vouchertype,id} = req.body;

    const newVoucher = await feature5Client.voucher.create({
      data: {
        voucher_name,
        voucher_image,
        start_date,
        end_date,
        description,
        point_use,
        venueId,
        isApprove,
      },
    });
    console.log(Vouchertype + "----");

    if (Vouchertype == "Discount") {
      const {
        fixDiscount: fix_discount,
        percentage: percent_discount,
        limitation: limitation,
        minimum: minimum_spend,
      } = req.body;

      await feature5Client.discount_voucher.create({
        data: {
          fix_discount,
          percent_discount,
          limitation,
          minimum_spend,
          voucherId: newVoucher.voucherId,
        },
      });
    }

    if (Vouchertype == "Gift") {
      const { limitation: limitation, minimum: minimum_spend } = req.body;

      await feature5Client.food_voucher.create({
        data: {
          limitation,
          minimum_spend,
          voucherId: newVoucher.voucherId,
        },
      });

      // await feature5Client.user_voucher.create({

      // })
    }

    res.json(newVoucher);
  } catch (err) {
    // const error = err as Error;
    // res.status(500).json({ error: error.message});
    const error = err as Error & { code?: string };
    console.error("Prisma error:", error);
    res.status(500).json({ err });
  }
};

export const DeleteVoucher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const discountVoucher = await feature5Client.discount_voucher.findUnique({
      where: { voucherId: parseInt(id) },
    });

    const foodVoucher = await feature5Client.food_voucher.findUnique({
      where: { voucherId: parseInt(id) },
    });

    if (discountVoucher) {
      await feature5Client.discount_voucher.delete({
        where: { voucherId: parseInt(id) },
      });
    }

    if (foodVoucher) {
      await feature5Client.food_voucher.delete({
        where: { voucherId: parseInt(id) },
      });
    }

    const DeleteAd = await feature5Client.voucher.delete({
      where: { voucherId: parseInt(id) },
    });

    res.json(DeleteAd);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const VoucherApprove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isApprove } = req.body;
    const ApproveVoucher = await feature5Client.voucher.update({
      where: { voucherId: parseInt(id) },
      data: { isApprove },
    });
    res.json(ApproveVoucher);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetallVenue = async (req: Request, res: Response) => {
  const { businessId } = authService.decodeToken(req.cookies.authToken);
  try {
    const getvenue = await feature5Client.property.findMany({
      where: { businessId },
      include: { venue: true },
    });
    res.json(getvenue);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetAllVoucher = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      return res.status(401).json({ error: "This user is not business user" });
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
      where: { venueId: venueId },
    });

    res.json(GetAllVoucher);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getVoucherById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const voucher = await feature5Client.voucher.findFirst({
        where: {
          voucherId: parseInt(id)
        },
      });
      res.json(voucher);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

  export const CollectVoucher = async (req: Request, res: Response) => {
    try {
      const { userId } = authService.decodeToken(req.cookies.authToken);
      const {id} = req.params;
      // const 
      const voucher = await feature5Client.user_voucher.create({
        data:{
          userId: userId,
          voucherId: parseInt(id),
          isUsed: false
        }
        
      });
      res.json(voucher);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

  export const getCollectedVoucher = async (req: Request, res: Response) => {
    try {
      const { userId } = authService.decodeToken(req.cookies.authToken);
      const voucher = await feature5Client.voucher.findMany({
        where: {
          User_voucher:{
            some:{
              userId: userId,
            }
          }
        },
        
        
      });
      res.json(voucher);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

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



// export const GetTodayPrivillage = async (req: Request, res: Response) => {
// 	const { userId } = authService.decodeToken(req.cookies.authToken);

// 	try {
// 		const GetTodayPrivillage = await feature5Client.voucher.findMany({
// 			where: {
// 				User_voucher: {
// 					every: {
// 						userId: userId,
// 					},
// 				},
// 				start_date: {
// 					lte: new Date(),
// 				},
// 				end_date: {
// 					gte: new Date(),
// 				},
// 			},
// 		});
// 		res.json(GetTodayPrivillage);
// 	} catch (err) {
// 		const error = err as Error;
// 		res.status(500).json({ error: error.message });
// 	}
// };

export const Getpointused = async (req: Request, res: Response) => {
  const { userId } = authService.decodeToken(req.cookies.authToken);

  try {
    const Getpointused = await feature5Client.point.findUnique({
      where: {
        pointId: userId,
      },
      select: {
        amount_used: true,
      },
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
    const {
      name,
      description,
      image_url,
      start_date,
      end_date,
      discount_price,
    } = newAd;

    const { menuId, venueId } = req.body;

    const newPromotion = await feature5Client.promotion.create({
      data: {
        name,
        description,
        image_url,
        start_date,
        end_date,
        discount_price,
        menuId,
        venueId,
      },
    });

    res.json(newPromotion);
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetAllBranches = async (req: Request, res: Response) => {
   const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      return res.status(401).json({ error: "This user is not business user" });
    }
    const businessId = decodedToken.businessId;

  try {
    const result = await feature5Client.venue_branch.findMany({
      select: {
        branch_name: true,
      },
      where: {
        venue: {
          Property: {
            some: {
              businessId: businessId,
            },
          },
        },
      },
    });

    res.json(result[0]);
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetMenuforSelect = async (req: Request, res: Response) => {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      return res.status(401).json({ error: "This user is not business user" });
    }
    const businessId = decodedToken.businessId;

    try {
      const result = await feature5Client.menu.findMany({
        select: {
          name: true
        },
        where: {
          venue: {
            Property: {
              some: {
                businessId: businessId,
              },
            },
          },
        },
      });
  
      res.json(result[0]);
    } catch (err) {
      console.log(err);
      const error = err as Error;
      res.status(500).json({ error: error.message });
    }
  };

export const DeletePromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletepromotion = await feature5Client.promotion.delete({
      where: { promotionId: parseInt(id) },
    });

    res.json(deletepromotion);
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const PromotionApprove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isApprove } = req.body;
    const ApproveVoucher = await feature5Client.promotion.update({
      where: { promotionId: parseInt(id) },
      data: { isApprove },
    });
    res.json(ApproveVoucher);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getAllPromotion = async (req: Request, res: Response) => {  //For Business
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      return res.status(401).json({ error: "This user is not business user" });
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
      where: { venueId: venueId },
    });

    res.json(getallPromotion);
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};


export const getPromotionbyId = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const getPromotion = await feature5Client.promotion.findFirst({
      where: {
        promotionId: parseInt(id),
      },
      
    });
    res.json(getPromotion);
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};


//------------------------------Redeem-----------------------------------
export const Redeem = async (req: Request, res: Response) => {
    try {
      // const isApprove = "In_progress"
      // const menuIds : number[] = req.body.menuIds;
      const newAd: Promotioninfo = req.body;
      const {
        name,
        description,
        image_url,
        start_date,
        end_date,
        discount_price,
      } = newAd;
  
      const { menuId, venueId } = req.body;
  
      const newPromotion = await feature5Client.promotion.create({
        data: {
          name,
          description,
          image_url,
          start_date,
          end_date,
          discount_price,
          menuId,
          venueId,
        },
      });
  
      res.json(newPromotion);
    } catch (err) {
      console.log(err);
      const error = err as Error;
      res.status(500).json({ error: error.message });
    }
  };