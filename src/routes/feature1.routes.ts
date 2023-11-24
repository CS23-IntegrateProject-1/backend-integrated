import { Router } from "express";

// here import your controllers(function)
import {
  getfeature1,
  paymentMethodHandler,
  searchHandler,
  tosHandler,
  privacyPolicyHandler,
  promptPayHandler,
  friendHandler,
  groupHandler,
  groupInfoHandler,
} from "../controllers/feature1.controller";
import { authMiddleware } from "../middlewares/feature1.middleware";
import { AboutController } from "../controllers/feature1/AboutController";
import ProfileController from "../controllers/feature1/ProfileController";

const aboutController = new AboutController();
const profileController = new ProfileController();

const feature1Router = Router();

// here define your routes
feature1Router.get("/", getfeature1);

feature1Router.get(
  "/about",
  authMiddleware,
  aboutController.show.bind(aboutController),
);
feature1Router.post(
  "/about",
  authMiddleware,
  aboutController.store.bind(aboutController),
);
feature1Router.put(
  "/about",
  authMiddleware,
  aboutController.update.bind(aboutController),
);
feature1Router.delete(
  "/about",
  authMiddleware,
  aboutController.destroy.bind(aboutController),
);

feature1Router.get("/term-of-services", tosHandler);
feature1Router.post("/term-of-services", tosHandler);
feature1Router.put("/term-of-services", tosHandler);
feature1Router.delete("/term-of-services", tosHandler);

feature1Router.get("/payment-method", paymentMethodHandler);
feature1Router.post("/payment-method", paymentMethodHandler);
feature1Router.put("/payment-method", paymentMethodHandler);
feature1Router.delete("/payment-method", paymentMethodHandler);

feature1Router.get("/privacy-policy", privacyPolicyHandler);
feature1Router.post("/privacy-policy", privacyPolicyHandler);
feature1Router.put("/privacy-policy", privacyPolicyHandler);
feature1Router.delete("/privacy-policy", privacyPolicyHandler);

feature1Router.get("/promptpay", promptPayHandler);
feature1Router.put("/promptpay", promptPayHandler);

feature1Router.get("/search/friends", searchHandler);

feature1Router.get("/friend", friendHandler);
feature1Router.post("/friend/add", friendHandler);

feature1Router.get(
  "/profile",
  authMiddleware,
  profileController.show.bind(profileController),
);
feature1Router.put(
  "/profile",
  authMiddleware,
  profileController.update.bind(profileController),
);

feature1Router.get("/group", groupHandler);
feature1Router.get("/group/:id", groupInfoHandler);
feature1Router.post("/group/add", groupHandler);

export default feature1Router;
