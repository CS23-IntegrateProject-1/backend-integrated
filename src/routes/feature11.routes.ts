import { Router } from "express";

// here import your controllers(function)
import {
    getfeature11,
} from "../controllers/feature11.controller";

const feature11Router = Router();

// here define your routes
feature11Router.get("/", getfeature11);

export default feature11Router;