import { Router } from "express";

// here import your controllers(function)
import {
    AdBusiness,
    getfeature5,
    AdminApprove
    //getUser
} from "../controllers/feature5.controller";

const feature5Router = Router();

// here define your routes
feature5Router.get("/", getfeature5);
feature5Router.post("/AdBSN/:id", AdBusiness);
feature5Router.patch("/AdminApprove/:id", AdminApprove);
// feature5Router.get("/User", getUser);

export default feature5Router;