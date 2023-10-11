import { Router } from "express";

// here import your controllers(function)
import {
    getfeature13,
} from "../controllers/feature13.controller";

const feature13Router = Router();

// here define your routes
feature13Router.get("/", getfeature13);

export default feature13Router;