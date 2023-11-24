import { Router } from "express";

// here import your controllers(function)
import {
    getfeature14,
} from "../controllers/feature14.controller";

const feature14Router = Router();

// here define your routes
feature14Router.get("/", getfeature14);

export default feature14Router;