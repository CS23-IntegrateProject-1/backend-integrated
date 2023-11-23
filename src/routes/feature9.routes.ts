import { Router } from "express";

// here import your controllers(function)
import {
    getfeature9,
    GetMembertier
} from "../controllers/feature9.controller";

const feature9Router = Router();

// here define your routes
feature9Router.get("/", getfeature9);
feature9Router.get("/Membertier/:id", GetMembertier);

export default feature9Router;