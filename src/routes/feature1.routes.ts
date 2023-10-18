import { Router } from "express";

// here import your controllers(function)
import {
    getfeature1,
} from "../controllers/feature1.controller";

const feature1Router = Router();

// here define your routes
feature1Router.get("/", getfeature1);

export default feature1Router;