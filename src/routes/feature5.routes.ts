import { Router } from "express";


import {
    AdBusiness,
    // getfeature5,
    AdminApprove,
    DeleteAdvertisement,
    GetAllAdvertisement,
    GetAllCompleteAdvertisement,
    GetAllTags,
    Voucher,
    GetallVenue,
    DeleteVoucher,
    VoucherApprove,
    GetCompleteVoucher,
    GetNotCompleteVoucher,
    // getUser
} from "../controllers/feature5.controller";

const feature5Router = Router();

// // here define your routes
// feature5Router.get("/", getfeature5);
feature5Router.post("/AdBSN/:id", AdBusiness);
feature5Router.patch("/AdminApprove/:id", AdminApprove);
feature5Router.delete("/DeleteAdBSN/:id", DeleteAdvertisement) ;
feature5Router.get("/AllAdBSN", GetAllAdvertisement);
feature5Router.get("/AllCompleteAdBSN", GetAllCompleteAdvertisement);
feature5Router.get("/AllTag", GetAllTags);
feature5Router.post("/Voucher", Voucher);
feature5Router.get("/AllVenue/:id", GetallVenue);
feature5Router.delete("/DeleteVoucher/:id", DeleteVoucher) ;
feature5Router.patch("/VoucherApprove/:id", VoucherApprove);
feature5Router.get("/AllCompleteVch", GetCompleteVoucher);
feature5Router.get("/AllNotCompleteVch", GetNotCompleteVoucher);


export default feature5Router;