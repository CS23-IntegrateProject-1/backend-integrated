import { Router } from "express";

// here import your controllers(function)
import {
  aboutHandler,
  accountHandler, bioFetchHandler,
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

feature1Router.get("/", termOfServiceHandler);
feature1Router.post("/", termOfServiceChangeHandler);

feature1Router.all("/help", helpHandler);
feature1Router.all("/about", aboutHandler);
feature1Router.get('/bio', bioFetchHandler);

export default feature1Router;
