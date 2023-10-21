import { Router } from "express";

// here import your controllers(function)
import {
    getMenuById,
    getMenus,
    getfeature7,
    getVenueById,
    getCustomerById,
    addProductToOrderDetails,
    createNewOrder,
    createOrderFromOrderDetails,
    menuOrderCount,
    getOrdersByCustomerIdandDate,
    getReceipt
} from "../controllers/feature7.controller";

const feature7Router = Router();

// here define your routes
feature7Router.get("/", getfeature7);
//get all menus
feature7Router.get("/getMenus",getMenus);
feature7Router.get("/getMenuById",getMenuById);
feature7Router.get("/getVenueById",getVenueById);
feature7Router.get("/getCustomerById",getCustomerById);
feature7Router.post("/addProductToOrderDetails",addProductToOrderDetails);
feature7Router.post("/createNewOrder",createNewOrder);
feature7Router.post("/createOrderFromOrderDetails",createOrderFromOrderDetails);
feature7Router.get("/menuOrderCount",menuOrderCount);
feature7Router.get("/getOrdersByCustomerIdandDate",getOrdersByCustomerIdandDate);
feature7Router.get("/getReceipt",getReceipt);
export default feature7Router;