import { Router } from "express";

// here import your controllers(function)
import {
    getfeature7,
} from "../controllers/feature7.controller";

const feature7Router = Router();

// here define your routes
feature7Router.get("/", getfeature7);

export default feature7Router;