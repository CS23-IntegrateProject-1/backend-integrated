import { Router } from "express";

// here import your controllers(function)
import {
    getfeature8,
} from "../controllers/feature8.controller";

const feature8Router = Router();

// here define your routes
feature8Router.get("/", getfeature8);

export default feature8Router;