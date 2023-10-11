import { Router } from "express";

// here import your controllers(function)
import {
    getfeature2,
} from "../controllers/feature2.controller";

const feature2Router = Router();

// here define your routes
feature2Router.get("/", getfeature2);

export default feature2Router;