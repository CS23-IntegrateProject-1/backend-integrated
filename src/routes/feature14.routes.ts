import { Router } from "express";

// here import your controllers(function)
import {
    getAdminUser,
    createAdminUser,
    updateAdminUser,
    createBusinessUser,
    getBusinessUser,
    updateBusinessUser,
} from "../controllers/feature14.controller";

const feature14Router = Router();

// here define your routes
feature14Router.get("/", getAdminUser);
feature14Router.post("/",createAdminUser);
feature14Router.put("/:id",updateAdminUser);
feature14Router.post("/",createBusinessUser);
feature14Router.get("/",getBusinessUser);
feature14Router.put("/:id",updateBusinessUser);
export default feature14Router;