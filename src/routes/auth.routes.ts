import { Router } from "express";

// here import your controllers(function)
import authController from "../controllers/auth.controller";
import { customVerifyCookie } from "../middlewares/verifyCookies";
const router = Router();

// here define your routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/verify", authController.verify);
router.get("/getUser", customVerifyCookie, authController.getUser);

export { router as AuthRoutes };
