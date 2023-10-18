import { Router } from "express";

// here import your controllers(function)
import {
    getfeature5,
} from "../controllers/feature5.controller";

const feature5Router = Router();

// here define your routes
feature5Router.get("/", getfeature5);

export default feature5Router;