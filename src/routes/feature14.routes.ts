import { Router } from "express";

// here import your controllers(function)
import {
    getfeature14,
    createAdminUser,
    updateAdminUser,
} from "../controllers/feature14.controller";

const feature14Router = Router();

// here define your routes
feature14Router.get("/", getfeature14);
feature14Router.post("/",createAdminUser);
feature14Router.put("/:id",updateAdminUser);
export default feature14Router;