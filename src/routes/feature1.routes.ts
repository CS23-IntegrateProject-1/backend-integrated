import { Router } from "express";

// here import your controllers(function)
import {
  aboutHandler,
  accountHandler,
  bioFetchHandler,
  getfeature1,
  helpHandler,
  paymentMethodHandler,
  privacyHandler,
  termOfServiceChangeHandler,
  termOfServiceHandler,
} from "../controllers/feature1.controller";

const feature1Router = Router();

// here define your routes
feature1Router.get("/", getfeature1);
feature1Router.all("/account", accountHandler);

feature1Router.all("/privacy-policy", privacyHandler);

feature1Router.get("/term-of-service", termOfServiceHandler);
feature1Router.post("/term-of-service", termOfServiceChangeHandler);

feature1Router.all("/help", helpHandler);
feature1Router.all("/about", aboutHandler);
feature1Router.get("/bio", bioFetchHandler);

feature1Router.get("/payment-method", paymentMethodHandler);
feature1Router.post("/payment-method", paymentMethodHandler);
feature1Router.put("/payment-method", paymentMethodHandler);
feature1Router.delete("/payment-method", paymentMethodHandler);

export default feature1Router;
