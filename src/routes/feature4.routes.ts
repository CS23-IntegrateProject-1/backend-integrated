import { Router } from "express";

// here import your controllers(function)
import {
    getfeature4,
} from "../controllers/feature4.controller";

const feature4Router = Router();

// here define your routes
feature4Router.get("/", getfeature4);

export default feature4Router;