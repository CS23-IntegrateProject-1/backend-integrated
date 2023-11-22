import { Router } from "express";

// here import your controllers(function)
import authController from "../controllers/auth.controller";
import { customVerifyCookie } from "../middlewares/verifyCookies";
const router = Router();

// here define your routes
router.post("/logout", authController.logout);
router.post("/verify", authController.verify);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/adminSignup", authController.adminSignup);
router.post("/adminLogin", authController.adminLogin);

router.get("/getUser", customVerifyCookie, authController.getUser);
router.get("/getUser/admin", customVerifyCookie, authController.getAdminUser);
router.get("/getUser/business", (req, res) => {
	res.send({ businessId: "1234", businessName: "Demo Business" });
});

export { router as AuthRoutes };
