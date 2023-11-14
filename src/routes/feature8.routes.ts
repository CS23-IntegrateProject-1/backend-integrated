import { Router } from "express";

// here import your controllers(function)
import {
    getAllUser,
    getfeature8,
    getAllAdvertisements,
    getAdvertisementById,
    getAllNotification,
    getAllTransactionDetails, 
    getTransactionDetailById ,
    createTransactionDetail
} from "../controllers/feature8.controller";

const feature8Router = Router();

// here define your routes
feature8Router.get("/", getfeature8);
feature8Router.get("/users", getAllUser); 
feature8Router.get("/advertisements", getAllAdvertisements); 
feature8Router.get("/advertisements/:advertisementId", getAdvertisementById);
feature8Router.get("/notifications", getAllNotification);
feature8Router.get("/transaction_details", getAllTransactionDetails); 
feature8Router.get("/transaction_details/:transactionId", getTransactionDetailById); 

feature8Router.post("/create_transaction_detail", createTransactionDetail);


export default feature8Router;