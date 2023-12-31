import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { adinfo } from "../interface/Auth/Advertisement";
import { Redeem } from "../interface/Auth/Redeem.interface";
// import { Promotioninfo } from "../interface/Auth/Promotion";
import authService from "../services/auth/auth.service";

import { MulterFile } from "multer";
// import { tr } from "date-fns/locale";

const feature5Client = new PrismaClient();

declare module "express-serve-static-core" {
  interface Request {
    file?: MulterFile;
  }
}

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
      start_date,
      end_date,
      cost,
      customer_type,
      target_group,
    } = newAd;

    const image_url =
      "/uploads/" + req.file.path.substring(req.file.path.lastIndexOf("/") + 1);

    //date is 2023-12-23 change it to date format
    const formattedStartDate = new Date(start_date);
    const formattedEndDate = new Date(end_date);

    if (!Array.isArray(Tags)) {
      return res.status(400).json({ error: "Tags must be an array" });
    }

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
  const { id } = req.params;
  console.log("Deleting advertisement with ID:", id);
  try {
    await feature5Client.ad_tag.deleteMany({
      where: { adId: parseInt(id) },
    });

    const DeleteAd = await feature5Client.ad_business.delete({
      where: { advertisementId: parseInt(id) },
    });
    res.json(DeleteAd);
  } catch (err) {
    const error = err as Error;
    console.log(err);
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

export const AdvertisementEditbyId = async (req: Request, res: Response) => {
  try {
    const {
      name: name,
      description: description,
      cost: cost,
      start_date: start_date,
      end_date: end_date,
      customer_type: customer_type,
      target_group: target_group,
    } = req.body;

    const advertisementId = Number(req.body.advertisementId);

    // const image_url =
    //   "/uploads/" + req.file.path.substring(req.file.path.lastIndexOf("/") + 1);
    if (req.file) {
      let image_url;
      if (req.file.path.includes("/")) {
        image_url =
          "/uploads/" +
          req.file.path.substring(req.file.path.lastIndexOf("/") + 1);
      } else if (req.file.path.includes("\\")) {
        image_url =
          "/uploads/" +
          req.file.path.substring(req.file.path.lastIndexOf("\\") + 1);
      }
      const isApprove = "In_progress";

      const EditAd = await feature5Client.ad_business.update({
        where: {
          advertisementId: advertisementId,
        },
        data: {
          name,
          description,
          image_url,
          cost,
          start_date,
          end_date,
          customer_type,
          target_group,
          isApprove,
        },
      });
      res.json(EditAd);
    } else {
      const isApprove = "In_progress";

      const EditAd = await feature5Client.ad_business.update({
        where: {
          advertisementId: advertisementId,
        },
        data: {
          name,
          description,
          cost,
          start_date,
          end_date,
          customer_type,
          target_group,
          isApprove,
        },
      });
      res.json(EditAd);
    }
  } catch (err) {
    const error = err as Error;
    console.log(err);
    res.status(500).json({ error: error.message });
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

    const advertisement = await feature5Client.ad_business.findUnique({
      where: { advertisementId: parseInt(id) },
      select: { name: true, cost: true },
    });

    if (!advertisement) {
      return res.status(404).json({ error: "Advertisement not found" });
    }

    const { name, cost } = advertisement;

    if (isApprove === "Awaiting_payment") {
      const title = `Your advertisement "${name}" Accepted from admin`;
      const message = `Please proceed with the payment for the advertisement "${name}" with a cost of ${cost}.`;
      const isApprove = "Awaiting_payment";

      await feature5Client.notification_ad_business.create({
        data: {
          title,
          message,
          isApprove: isApprove,
          advertisementId: parseInt(id),
        },
      });
    }

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
      description,
      voucherType: Vouchertype,
    } = req.body;

    const point_use = parseInt(req.body.point_use);

    // const { name, description, start_date, end_date, discount_price } = newAd;
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);

    const voucher_image =
      "/uploads/" + req.file.path.substring(req.file.path.lastIndexOf("/") + 1);

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
      const limitation = parseInt(req.body.limitation);
      const fix_discount = parseInt(req.body.fix_discount);
      const percent_discount = parseInt(req.body.percent_discount);
      const minimum_spend = parseInt(req.body.minimum_spend);

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
      // const { limitation: limitation, minimum: minimum_spend } = req.body;
      const minimum_spend = parseInt(req.body.minimum_spend_gift);
      const limitation = parseInt(req.body.limitation);

      await feature5Client.food_voucher.create({
        data: {
          limitation,
          minimum_spend,
          voucherId: newVoucher.voucherId,
        },
      });
    }
    res.json(newVoucher);
  } catch (err) {
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

export const VoucherEditbyId = async (req: Request, res: Response) => {
  try {
    const {
      // voucherId,
      voucher_name,
      start_date,
      end_date,
      description,
      // venueId,
    } = req.body;
    // const imageFile = req.file as MulterFile;
    const venueId = parseInt(req.body.venueId);
    const voucherId = parseInt(req.body.voucherId);

    if (req.file) {
      let voucher_image;
      if (req.file.path.includes("/")) {
        voucher_image =
          "/uploads/" +
          req.file.path.substring(req.file.path.lastIndexOf("/") + 1);
      } else if (req.file.path.includes("\\")) {
        voucher_image =
          "/uploads/" +
          req.file.path.substring(req.file.path.lastIndexOf("\\") + 1);
      }
      const isApprove = "In_progress";

      const EditVoucher = await feature5Client.voucher.update({
        where: {
          voucherId: voucherId,
        },
        data: {
          voucher_name,
          voucher_image,
          start_date,
          end_date,
          description,
          venueId,
          isApprove,
        },
      });
      res.json(EditVoucher);
    } else {
      const isApprove = "In_progress";

      const EditVoucher = await feature5Client.voucher.update({
        where: {
          voucherId: voucherId,
        },
        data: {
          voucher_name,
          start_date,
          end_date,
          description,
          venueId,
          isApprove,
        },
      });
      res.json(EditVoucher);
    }
  } catch (err) {
    const error = err as Error;
    console.log(err);
    res.status(500).json({ error: error.message });
  }
};

export const GetallVenue = async (req: Request, res: Response) => {
  const { businessId } = authService.decodeToken(req.cookies.authToken);
  try {
    const getvenue = await feature5Client.property.findMany({
      where: { businessId },
      include: { Venue: true },
    });
    res.json(getvenue);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetAllVoucherForUser = async (req: Request, res: Response) => {
  try {
    const getvoucher = await feature5Client.voucher.findMany({
      where: {
        isApprove: "Completed",
      },
    });
    res.json(getvoucher);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const CheckVouchernotCollected = async (req: Request, res: Response) => {
  const { userId } = authService.decodeToken(req.cookies.authToken);
  const { voucherId } = req.params;
  try {
    const getvoucher = await feature5Client.user_voucher.findFirst({
      where: {
        userId: userId,
        voucherId: parseInt(voucherId),
      },
    });
    res.json({ hasVoucher: !!getvoucher });
  } catch (err) {
    const error = err as Error;
    console.log(err);
    res.status(500).json({ error: error.message });
  }
};

export const GetVoucherIncludeIsused = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getvouchers = await feature5Client.voucher.findFirst({
      where: {
        voucherId: parseInt(id),
        isApprove: "Completed",
      },
      include: {
        User_voucher: {
          select: {
            isUsed: true,
          },
        },
      },
    });
    res.json(getvouchers);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetAllVoucherForBusiness = async (req: Request, res: Response) => {
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

    const Discountvoucher = await feature5Client.discount_voucher.findFirst({
      where: {
        voucherId: parseInt(id),
      },
    });
    if (Discountvoucher) {
      console.log({ ...Discountvoucher, voucherType: "Discount" });
      const voucher = await feature5Client.voucher.findFirst({
        where: {
          voucherId: parseInt(id),
        },
        include: {
          Discount_voucher: {
            select: {
              limitation: true,
              fix_discount: true,
              minimum_spend: true,
              percent_discount: true,
            },
          },
        },
      });
      res.json({
        ...voucher,
        voucherType: "Discount",
        Food_voucher: {
          mininimun_spend: 0,
          limitation: 0,
        },
      });
    }
    const Foodvoucher = await feature5Client.food_voucher.findFirst({
      where: {
        voucherId: parseInt(id),
      },
    });

    if (Foodvoucher) {
      console.log({ ...Foodvoucher, voucherType: "Food" });
      const voucher = await feature5Client.voucher.findFirst({
        where: {
          voucherId: parseInt(id),
        },
        include: {
          Food_voucher: {
            select: {
              limitation: true,
              minimum_spend: true,
            },
          },
        },
      });
      res.json({
        ...voucher,
        voucherType: "Gift",
        Discountvoucher: {
          limitation: 0,
          fix_discount: 0,
          minimum_spend: 0,
          percent_discount: 0,
        },
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const CollectVoucher = async (req: Request, res: Response) => {
  try {
    const { userId } = authService.decodeToken(req.cookies.authToken);
    const { id } = req.params;

    const voucher = await feature5Client.user_voucher.create({
      data: {
        userId: userId,
        voucherId: parseInt(id),
        isUsed: false,
      },
    });

    const GetPoint = await feature5Client.voucher.findUnique({
      where: {
        voucherId: parseInt(id),
      },
      select: {
        point_use: true,
      },
    });

    const GetOriginalPoint = await feature5Client.point.findFirst({
      where: {
        userId: userId,
      },
      select: {
        amount: true,
        pointId: true,
        amount_used: true,
      },
    });
    if (GetOriginalPoint && GetPoint) {
      const newAmount = GetOriginalPoint?.amount - (GetPoint?.point_use || 0);
      const UpdateAmountUsed =
        (GetOriginalPoint?.amount_used || 0) + (GetPoint?.point_use || 0);

      const deductPoint = await feature5Client.point.update({
        where: {
          pointId: GetOriginalPoint?.pointId,
        },
        data: {
          amount: newAmount,
          amount_used: UpdateAmountUsed,
        },
      });
      console.log(deductPoint);
      console.log(UpdateAmountUsed);
    }

    res.json(voucher);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const UpdateUsedVoucher = async (req: Request, res: Response) => {
  try {
    const { userId } = authService.decodeToken(req.cookies.authToken);
    const { id } = req.params;

    const userVoucher = await feature5Client.user_voucher.findUnique({
      where: {
        userId_voucherId: {
          userId: userId,
          voucherId: parseInt(id),
        },
      },
    });

    if (!userVoucher) {
      return res
        .status(404)
        .json({ message: "User does not have this voucher." });
    }

    const updatedVoucher = await feature5Client.user_voucher.update({
      where: {
        userId_voucherId: {
          userId: userId,
          voucherId: parseInt(id),
        },
      },
      data: {
        //isUsed: true,
      },
    });

    res.json(updatedVoucher);
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
        isApprove: "Completed",
        User_voucher: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        User_voucher: {
          select: {
            isUsed: true,
          },
        },
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
        Member_tier: {
          select: {
            tier_name: true,
          },
        },
      },
    });
    res.json(gettierName?.Member_tier?.tier_name);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetMembertierPrivilleges = async (req: Request, res: Response) => {
  const { userId } = authService.decodeToken(req.cookies.authToken);
  try {
    const GetInfoMembertier = await feature5Client.user.findUnique({
      where: { userId: userId },
      select: {
        Member_tier: {
          select: {
            tier_benefit: true,
          },
        },
      },
    });

    res.json(GetInfoMembertier?.Member_tier?.tier_benefit);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetExpireDate = async (req: Request, res: Response) => {
  const { userId } = authService.decodeToken(req.cookies.authToken);
  try {
    const GetPointId = await feature5Client.point.findFirst({
      where: {
        userId: userId,
      },
      select: {
        pointId: true,
      },
    });

    const GetDate = await feature5Client.point.findUnique({
      where: {
        pointId: GetPointId?.pointId,
      },
      select: {
        month_created: true,
      },
    });

    if (GetDate && GetDate.month_created) {
      // Convert the fetched date string to a JavaScript Date object
      const currentDate = new Date(GetDate.month_created);
      // Increase the date by 1 year
      currentDate.setFullYear(currentDate.getFullYear() + 1);

      // Now, currentDate represents the date increased by 1 year
      res.json({ currentDate });
    } else {
      res.status(404).json({ message: "Date not found" });
    }
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

  const GetPointId = await feature5Client.point.findFirst({
    where: {
      userId: userId,
    },
    select: {
      pointId: true,
    },
  });

  try {
    const Getpointused = await feature5Client.point.findUnique({
      where: {
        pointId: GetPointId?.pointId,
      },
      select: {
        amount: true,
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
    // const newAd: Promotioninfo = req.body;
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

    const discount_price = parseInt(req.body.discount_price);
    const menuId = parseInt(req.body.menuId);
    const { name, description } = req.body;
    const branchIdInt = parseInt(req.body.branchId);

    // const { name, description, start_date, end_date, discount_price } = newAd;
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);
    // console.log(start);
    console.log(start_date);
    const image_url =
      "/uploads/" + req.file.path.substring(req.file.path.lastIndexOf("/") + 1);

    const newPromotion = await feature5Client.promotion.create({
      data: {
        name,
        description,
        image_url,
        start_date,
        end_date,
        discount_price: discount_price,
        menuId,
        venueId,
        branchId: branchIdInt,
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
        venueId: true,
        branchId: true,
      },
      where: {
        Venue: {
          Property: {
            some: {
              businessId: businessId,
            },
          },
        },
      },
    });

    res.json(result);
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
        name: true,
        menuId: true,
      },
      where: {
        Venue: {
          Property: {
            some: {
              businessId: businessId,
            },
          },
        },
      },
    });

    res.json(result);
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

export const GetCompletePromotion = async (req: Request, res: Response) => {
  try {
    const ApproveVoucher = await feature5Client.promotion.findMany({
      where: { isApprove: "Completed" },
    });
    res.json(ApproveVoucher);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getAllPromotion = async (req: Request, res: Response) => {
  //For Business
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      try {
        const result = await feature5Client.promotion.findMany({
          where: {
            //isApprove: "Completed",
          },
        });
        return res.status(200).send(result);
      } catch (e: Error | any) {
        throw new Error(e.message);
      }
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

export const PromotionEditbyId = async (req: Request, res: Response) => {
  try {
    const {
      promotionId: promotionId,
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      discount_price: discount_price,
      menuId: menuId,
      branchId: branchId,
    } = req.body;

    const isApprove = "In_progress";
    const promotionIdInt = parseInt(promotionId);
    const discount_priceInt = parseInt(discount_price);
    const menuIdInt = parseInt(menuId);
    const branchIdInt = parseInt(branchId);
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

    if (req.file) {
      let promotionImage;
      if (req.file.path.includes("/")) {
        promotionImage =
          "/uploads/" +
          req.file.path.substring(req.file.path.lastIndexOf("/") + 1);
      } else if (req.file.path.includes("\\")) {
        promotionImage =
          "/uploads/" +
          req.file.path.substring(req.file.path.lastIndexOf("\\") + 1);
      }
      const EditPromotion = await feature5Client.promotion.update({
        where: {
          promotionId: promotionIdInt,
        },
        data: {
          name,
          description,
          image_url: promotionImage,
          start_date,
          end_date,
          isApprove,
          discount_price: discount_priceInt,
          venueId: venueId,
          menuId: menuIdInt,
          branchId: branchIdInt,
        },
      });
      res.json(EditPromotion);
    } else {
      const EditPromotion = await feature5Client.promotion.update({
        where: {
          promotionId: promotionIdInt,
        },
        data: {
          name,
          description,
          start_date,
          end_date,
          isApprove,
          discount_price: discount_priceInt,
          venueId: venueId,
          menuId: menuIdInt,
          branchId: branchIdInt,
        },
      });
      res.json(EditPromotion);
    }
  } catch (err) {
    const error = err as Error;
    console.log(err);
    res.status(500).json({ error: error.message });
  }
};

export const getPromotionbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

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

export const getDetailPromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getDetail = await feature5Client.promotion.findFirst({
      where: {
        promotionId: parseInt(id),
      },
    });

    const getVeuneList = await feature5Client.venue_branch.findMany({
      where: {
        venueId: getDetail?.venueId,
      },
      select: {
        branch_name: true,
      },
    });

    res.json({
      getDetail,
      getVeuneList,
    });
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

//------------------------------Redeem-----------------------------------
export const GetRedeem = async (req: Request, res: Response) => {
  try {
    const { userId } = authService.decodeToken(req.cookies.authToken);

    const getMembertier = await feature5Client.user.findFirst({
      where: {
        userId: userId,
      },
      select: {
        tierId: true,
      },
    });

    if (getMembertier && getMembertier.tierId !== null) {
      const tierId = getMembertier.tierId;

      // Fetch tier_name from Member_tier table using tierId
      const getRedeem = await feature5Client.redeem_privilege.findMany({
        where: {
          memberTier: Number(tierId),
        },
      });
      res.json(getRedeem);
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetRedeembyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const GetRedeembyId = await feature5Client.redeem_privilege.findFirst({
      where: {
        redeemId: parseInt(id),
      },
    });

    res.json(GetRedeembyId);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const GetDeleteRedeembyId = async (req: Request, res: Response) => {
  try {
    const { redeemId } = req.params;
    const GetDeletebyId = await feature5Client.redeem_privilege.delete({
      where: {
        redeemId: parseInt(redeemId),
      },
    });

    res.json(GetDeletebyId);
  } catch (err) {
    const error = err as Error;
    console.log(err);
    res.status(500).json({ error: error.message });
  }
};

export const GetRedeembyBusinessId = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      try {
        const result = await feature5Client.promotion.findMany({
          where: {
            //isApprove: "Completed",
          },
        });
        return res.status(200).send(result);
      } catch (e: Error | any) {
        throw new Error(e.message);
      }
    }
    const businessId = decodedToken.businessId;

    const GetRedeembyBusinessId =
      await feature5Client.redeem_privilege.findMany({
        where: {
          businessId: businessId,
        },
      });

    res.json(GetRedeembyBusinessId);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const CreateRedeem = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    if (decodedToken.userType != "business") {
      try {
        const result = await feature5Client.promotion.findMany({
          where: {
            //isApprove: "Completed",
          },
        });
        return res.status(200).send(result);
      } catch (e: Error | any) {
        throw new Error(e.message);
      }
    }
    const businessId = decodedToken.businessId;

    const Redeem: Redeem = req.body;
    const { title, description, memberTier } = Redeem;

    const memberTierNumber = parseInt(memberTier);
    const image_url =
      "/uploads/" + req.file.path.substring(req.file.path.lastIndexOf("/") + 1);

    const newRedeem = await feature5Client.redeem_privilege.create({
      data: {
        title,
        description,
        image_url,
        memberTier: memberTierNumber,
        businessId: businessId,
      },
    });

    res.json(newRedeem);
  } catch (err) {
    const error = err as Error;
    console.log(err);
    res.status(500).json({ error: error.message });
  }
};
