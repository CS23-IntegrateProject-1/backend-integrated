import { Router } from "express";

// here import your controllers(function)
import {
  getfeature1,
  paymentMethodHandler,
  tosHandler,
  privacyPolicyHandler,
  promptPayHandler,
  groupHandler,
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

const aboutController = new AboutController();
const friendController = new FriendController();
const profileController = new ProfileController();
const searchController = new SearchController();
const venueController = new VenueController();

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
  profileController.update.bind(profileController),
);

feature1Router.get("/group", groupHandler);
feature1Router.get("/group/:id", groupInfoHandler);
feature1Router.post("/group/add", groupHandler);

feature1Router.get(
  "/venue",
  businessAuthMiddleware,
  venueController.show.bind(venueController),
);
feature1Router.put(
  "/venue/info",
  businessAuthMiddleware,
  venueController.update.bind(venueController),
);

export default feature1Router;
