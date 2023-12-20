import { Router } from "express";
import multerConfig from "../multerConfig";

// here import your controllers(function)
import {
  getfeature1,
  paymentMethodHandler,
  tosHandler,
  privacyPolicyHandler,
  promptPayHandler,
  groupInfoHandler,
} from "../controllers/feature1.controller";
import {
  userAuthMiddleware,
  businessAuthMiddleware,
} from "../middlewares/feature1.middleware";
import { AboutController } from "../controllers/feature1/AboutController";
import FriendController from "../controllers/feature1/FriendController";
import ProfileController from "../controllers/feature1/ProfileController";
import SearchController from "../controllers/feature1/SearchController";
import VenueController from "../controllers/feature1/VenueController";
import GroupController from "../controllers/feature1/GroupController";
import QrController from "../controllers/feature1/QrController";
import { HelpDeskController } from "../controllers/feature1";

const aboutController = new AboutController();
const friendController = new FriendController();
const profileController = new ProfileController();
const searchController = new SearchController();
const venueController = new VenueController();
const groupController = new GroupController();
const qrController = new QrController();
const helpDeskController = new HelpDeskController();

const feature1Router = Router();

// here define your routes
feature1Router.get("/", getfeature1);

feature1Router.get(
  "/about",
  userAuthMiddleware,
  aboutController.show.bind(aboutController),
);
feature1Router.post(
  "/about",
  userAuthMiddleware,
  aboutController.store.bind(aboutController),
);
feature1Router.put(
  "/about",
  userAuthMiddleware,
  aboutController.update.bind(aboutController),
);
feature1Router.delete(
  "/about",
  userAuthMiddleware,
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

feature1Router.get(
  "/search/friends",
  userAuthMiddleware,
  searchController.show.bind(searchController),
);

feature1Router.get(
  "/friend",
  userAuthMiddleware,
  friendController.index.bind(friendController),
);
feature1Router.post(
  "/friend/add",
  userAuthMiddleware,
  friendController.addFriend.bind(friendController),
);

feature1Router.get(
  "/profile",
  userAuthMiddleware,
  profileController.show.bind(profileController),
);
feature1Router.put(
  "/profile",
  userAuthMiddleware,
  multerConfig.single("avatar"),
  profileController.update.bind(profileController),
);

feature1Router.get(
  "/group",
  userAuthMiddleware,
  groupController.index.bind(groupController),
);
feature1Router.get("/group/:id", groupInfoHandler);
feature1Router.post(
  "/group/add",
  userAuthMiddleware,
  multerConfig.single("avatar"),
  groupController.create.bind(groupController),
);

feature1Router.get(
  "/venue",
  businessAuthMiddleware,
  venueController.show.bind(venueController),
);
feature1Router.put(
  "/venue/info",
  businessAuthMiddleware,
  multerConfig.single("avatar"),
  venueController.update.bind(venueController),
);
feature1Router.get(
  "/venue/promptpay",
  businessAuthMiddleware,
  venueController.showPromptPay.bind(venueController),
);
feature1Router.put(
  "/venue/promptpay",
  businessAuthMiddleware,
  venueController.updatePromptPay.bind(venueController),
);
feature1Router.put(
  "/venue/opening_hours",
  businessAuthMiddleware,
  venueController.updateOpeningHours.bind(venueController),
);
feature1Router.post(
  "/venue/credit_card",
  businessAuthMiddleware,
  venueController.createCreditCard.bind(venueController),
);
feature1Router.get(
  "/venue/credit_card",
  businessAuthMiddleware,
  venueController.indexCreditCard.bind(venueController),
);
feature1Router.get(
  "/venue/credit_card/:id",
  businessAuthMiddleware,
  venueController.showCreditCard.bind(venueController),
);
feature1Router.delete(
  "/venue/credit_card/:id",
  businessAuthMiddleware,
  venueController.deleteCreditCard.bind(venueController),
);

feature1Router.get(
  "/qr",
  userAuthMiddleware,
  qrController.generate.bind(qrController),
);
feature1Router.get(
  "/qr/:username",
  userAuthMiddleware,
  qrController.generateByUsername.bind(qrController),
);

feature1Router.post(
  "/help_desk/ticket",
  userAuthMiddleware,
  helpDeskController.create.bind(helpDeskController),
);
feature1Router.get(
  "/help_desk/ticket/:id",
  userAuthMiddleware,
  helpDeskController.show.bind(helpDeskController),
);

export default feature1Router;
