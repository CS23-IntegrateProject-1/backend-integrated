import { Router } from "express";

// here import your controllers(function)
import {
    getfeature12,
} from "../controllers/feature12.controller";

const feature12Router = Router();

// here define your routes
feature12Router.get("/", getfeature12);

export default feature12Router;