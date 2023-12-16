import { Router } from "express";

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
  GetAllVoucher,
  GettierName,
  GetInfoMembertier,
  // GetTodayPrivillage,
  GetMyReward,
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

} from "../controllers/feature5.controller";

const feature5Router = Router();

// // here define your routes
// feature5Router.get("/", getfeature5);

//Advertisement
feature5Router.post("/AdBSN", customVerifyCookie, AdBusiness); // for create Business advertisement
feature5Router.patch("/AdminApprove/:id", AdminApprove); //for approve advertisement
feature5Router.delete("/DeleteAdBSN/:id", DeleteAdvertisement); // for delete advertisement
feature5Router.get("/AllInprogressAdBSN", GetInprogressAdvertisement); //for show In_Progress or rejected status of advertisement
feature5Router.get("/AllCompleteAdBSN", GetAllCompleteAdvertisement); //for show only completed advertisement
feature5Router.get("/AdBSN/:id", getAdvertisementById); //for show each advertisement by using advertisement id
feature5Router.get("/AllAdBSN/", customVerifyCookie, GetAllAdvertisement); //for show all advertisement was created
feature5Router.get("/AllTag", GetAllTags); //for show all tag that business can choose to advert in user side

//Voucher
feature5Router.post("/Voucher", Voucher); // for create voucher
feature5Router.get("/AllVenue/:id", GetallVenue); //for show all venues of business to choose their venue that can use voucher
feature5Router.delete("/DeleteVoucher/:id", DeleteVoucher); // for delete voucher
feature5Router.patch("/VoucherApprove/:id", VoucherApprove); //for approve status of voucher
feature5Router.get("/AllVoucher", GetAllVoucher); //for show all voucher are created
feature5Router.get("/AllVoucher/:id", getVoucherById); //for show voucher for update
//MyReward
feature5Router.get("/AllCollectedVoucher/",customVerifyCookie, getCollectedVoucher); //for show collected voucher for update
feature5Router.post("/CollecteVoucher/:id",customVerifyCookie, CollectVoucher); //for collect voucher for update

//Membertier
feature5Router.get("/tierName/", customVerifyCookie, GettierName); //for show only tier
feature5Router.get("/InfoMembertier/", customVerifyCookie, GetInfoMembertier); //for show tiername, tierbenefit
// feature5Router.get("/TodayPrivillage/", customVerifyCookie, GetTodayPrivillage);
feature5Router.post("/MyReward/", customVerifyCookie, GetMyReward); //for show voucher that user click to keep
feature5Router.get("/pointUsed/", customVerifyCookie, Getpointused); //for show only point used of user

//Promotion
feature5Router.post("/Promotion", Promotion); // for create promotion
feature5Router.delete("/DeletePromotion/:id", DeletePromotion); // for create promotion
feature5Router.get("/Showbranch/", GetAllBranches); //show branch for select in create proomotion
feature5Router.get("/Showmenu/", GetMenuforSelect); //show menu for select in create proomotion
feature5Router.patch("/PromotionApprove/:id", PromotionApprove); //for approve promotion in admin side
feature5Router.get("/AllPromotion/", getAllPromotion); //for show all promotion
feature5Router.get("/AllPromotion/:id", getPromotionbyId); //for update promotion




//Redeem

export default feature5Router;
