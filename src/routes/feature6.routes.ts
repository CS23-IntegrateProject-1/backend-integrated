import { Router } from "express";

// here import your controllers(function)
import {
    getfeature6,
} from "../controllers/feature6.controller";

const feature6Router = Router();

// here define your routes
feature6Router.get("/", getfeature6);

export default feature6Router;