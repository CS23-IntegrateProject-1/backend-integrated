import { Router } from "express";

// here import your controllers(function)
import {
    getfeature5,
    getAdvertisement
} from "../controllers/feature5.controller";

const feature5Router = Router();

// here define your routes
feature5Router.get("/", getfeature5);
feature5Router.get("/Advertisement", getAdvertisement);

export default feature5Router;