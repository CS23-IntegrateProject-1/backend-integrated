import { Router } from "express";

// here import your controllers(function)
import {
  aboutHandler,
  accountHandler,
  getfeature1,
  helpHandler,
  notificationHandler,
  privacyHandler,
  termOfServiceChangeHandler,
  termOfServiceHandler,
} from "../controllers/feature1.controller";

const feature1Router = Router();

// here define your routes
feature1Router.get("/", getfeature1);
feature1Router.all("/account", accountHandler);
feature1Router.all("/notification", notificationHandler);
feature1Router.all("/privacy-policy", privacyHandler);
feature1Router.get("/term-of-service", termOfServiceHandler);
feature1Router.post("/term-of-service", termOfServiceChangeHandler);
feature1Router.all("/help", helpHandler);
feature1Router.all("/about", aboutHandler);

export default feature1Router;
