import { Router } from "express";

// here import your controllers(function)
import {
    getfeature10,
} from "../controllers/feature10.controller";

const feature10Router = Router();

// here define your routes
feature10Router.get("/", getfeature10);

export default feature10Router;