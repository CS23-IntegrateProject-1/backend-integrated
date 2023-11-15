import { Router } from "express";

// here import your controllers(function)
import authController from "../controllers/auth.controller";
const router = Router();

// here define your routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

export { router as AuthRoutes };
