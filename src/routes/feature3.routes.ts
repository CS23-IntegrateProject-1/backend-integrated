import { Router } from "express";

// here import your controllers(function)
import {
    getfeature3,
} from "../controllers/feature3.controller";

const feature3Router = Router();

// here define your routes
feature3Router.get("/", getfeature3);

export default feature3Router;