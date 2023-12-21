import { Router } from "express";
import multerConfig from "../multerConfig";

import { customVerifyCookie } from "../middlewares/verifyCookies";

import {
  AdBusiness,
  // getfeature5,
  AdminApprove,
  DeleteAdvertisement,
  GetInprogressAdvertisement,
  GetAllAdvertisement,
  GetAllCompleteAdvertisement,
  GetAllTags,
  Voucher,
  GetallVenue,
  DeleteVoucher,
  VoucherApprove,
  GetAllVoucherForBusiness,
  GettierName,
  GetMembertierPrivilleges,
  // GetTodayPrivillage,
  Getpointused,
  Promotion,
  DeletePromotion,
  PromotionApprove,
  getAllPromotion,
  getAdvertisementById,
  GetAllBranches,
  GetMenuforSelect,
  getVoucherById,
  getPromotionbyId,
  getCollectedVoucher,
  CollectVoucher,
  UpdateUsedVoucher,
  GetRedeem,
  CreateRedeem,
  getDetailPromotion,
  GetAllVoucherForUser,
  GetExpireDate,
  GetCompletePromotion,
  GetRedeembyId,
  GetVoucherIncludeIsused,
  VoucherEditbyId,
  AdvertisementEditbyId,
  PromotionEditbyId,
  CheckVouchernotCollected,
  GetRedeembyBusinessId,
  GetDeleteRedeembyId,
} from "../controllers/feature5.controller";

const feature5Router = Router();

// // here define your routes
// feature5Router.get("/", getfeature5);

//Advertisement
feature5Router.post(
  "/AdBSN",
  multerConfig.single("file"),
  customVerifyCookie,
  AdBusiness
); // for create Business advertisement
feature5Router.patch("/AdminApprove/:id", AdminApprove); //for approve advertisement
feature5Router.delete("/DeleteAdBSN/:id", DeleteAdvertisement); // for delete advertisement
feature5Router.get("/AllInprogressAdBSN", GetInprogressAdvertisement); //for show In_Progress or rejected status of advertisement
feature5Router.get("/AllCompleteAdBSN", GetAllCompleteAdvertisement); //for show only completed advertisement for s
feature5Router.get("/AdBSN/:id", getAdvertisementById); //for show each advertisement by using advertisement id
feature5Router.get("/AllAdBSN/", GetAllAdvertisement); //for show all advertisement was created
feature5Router.get("/AllTag", GetAllTags); //for show all tag that business can choose to advert in user side
feature5Router.post(
  "/UpdateAdvertisementEditId/",
  multerConfig.single("file"),
  AdvertisementEditbyId
);

//Voucher
feature5Router.post("/Voucher/", multerConfig.single("file"), Voucher); // for create voucher
feature5Router.get("/AllVenue/", GetallVenue); //for show all venues of business to choose their venue that can use voucher
feature5Router.delete("/DeleteVoucher/:id", DeleteVoucher); // for delete voucher
feature5Router.patch("/VoucherApprove/:id", VoucherApprove); //for approve status of voucher
feature5Router.get("/AllVoucher", GetAllVoucherForBusiness); //for show all voucher are created
feature5Router.get("/GetVoucherForUser/", GetAllVoucherForUser); //for show all voucher are created
feature5Router.get("/AllVoucher/:id", getVoucherById); //for show voucher for updaten
feature5Router.get("/GetVoucherForUser/:id", GetVoucherIncludeIsused);
feature5Router.post(
  "/UpdateVoucherEditbyId/",
  multerConfig.single("file"),
  VoucherEditbyId
);
feature5Router.get(
  "/CheckVoucher/:voucherId",
  customVerifyCookie,
  CheckVouchernotCollected
); //for check each voucher is not collected
//MyReward
feature5Router.get(
  "/AllCollectedVoucher/",
  customVerifyCookie,
  getCollectedVoucher
); //for show collected voucher for update
feature5Router.post("/CollectVoucher/:id", customVerifyCookie, CollectVoucher); //for collect voucher
feature5Router.patch(
  "/UpdateUsedVoucher/:id",
  multerConfig.single("file"),
  customVerifyCookie,
  UpdateUsedVoucher
); //for collect voucher for update

//Membertier
feature5Router.get("/tierName/", customVerifyCookie, GettierName); //for show only tier
feature5Router.get(
  "/MembertierPrivilleges/",
  customVerifyCookie,
  GetMembertierPrivilleges
); //for show tiername, tierbenefit
// feature5Router.get("/TodayPrivillage/", customVerifyCookie, GetTodayPrivillage);
feature5Router.get("/pointUsed/", customVerifyCookie, Getpointused); //for show only point used of user
feature5Router.get("/ExpireDate/", customVerifyCookie, GetExpireDate);

//Promotion
feature5Router.post("/Promotion", multerConfig.single("file"), Promotion); // for create promotion
feature5Router.delete("/DeletePromotion/:id", DeletePromotion); // for create promotion
feature5Router.get("/Showbranch/", GetAllBranches); //show branch for select in create proomotion
feature5Router.get("/Showmenu/", GetMenuforSelect); //show menu for select in create proomotion
feature5Router.patch("/PromotionApprove/:id", PromotionApprove); //for approve promotion in admin side
feature5Router.get("/AllPromotion/", getAllPromotion); //for show all promotion
feature5Router.get("/AllPromotion/:id", getPromotionbyId); //for update promotion
feature5Router.get("/GetDetailPromotion/:id", getDetailPromotion); //for update promotion
feature5Router.get("/GetCompletePromotion", GetCompletePromotion); //for all complete
feature5Router.post(
  "/UpdatePromotionEditbyId/",
  multerConfig.single("file"),
  PromotionEditbyId
);
//Redeem
feature5Router.get("/GetRedeem", customVerifyCookie, GetRedeem); //for show redeem of customer depend on their member tier
feature5Router.post("/createRedeem", multerConfig.single("file"), CreateRedeem); // for create promotion
feature5Router.get("/GetRedeembyId/:id", GetRedeembyId);
feature5Router.get("/GetRedeembyBusinessId/", GetRedeembyBusinessId);
feature5Router.delete("/DeleteRedeem/:redeemId", GetDeleteRedeembyId);

export default feature5Router;
