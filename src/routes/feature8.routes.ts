import { Router } from "express";

// here import your controllers(function)
import {
    getAllUser,
    getfeature8,
    getAllAdvertisements,
    getAdvertisementById,
    getAllNotification,
    getAllTransaction_detail
} from "../controllers/feature8.controller";

const feature8Router = Router();

// here define your routes
feature8Router.get("/", getfeature8);
feature8Router.get("/AllUser", getAllUser);
feature8Router.get("/ad_business", getAllAdvertisements);
feature8Router.get("/ad_business/:advertisementId", getAdvertisementById);
feature8Router.get("/notification", getAllNotification);
feature8Router.get("/transaction_detail", getAllTransaction_detail);



export default feature8Router;