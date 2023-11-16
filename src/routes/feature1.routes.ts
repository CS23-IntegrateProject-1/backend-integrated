import { Router } from "express";

// here import your controllers(function)
import {
  aboutHandler,
  accountHandler,
  bioFetchHandler,
  getfeature1,
  helpHandler,
  paymentMethodHandler,
  tosHandler,
  privacyPolicyHandler,
  promptPayHandler,
} from "../controllers/feature1.controller";

const feature1Router = Router();

// here define your routes
feature1Router.get("/", getfeature1);
feature1Router.all("/account", accountHandler);

feature1Router.all("/help", helpHandler);
feature1Router.get("/bio", bioFetchHandler);

feature1Router.get("/about", aboutHandler);
feature1Router.post("/about", aboutHandler);
feature1Router.put("/about", aboutHandler);
feature1Router.delete("/about", aboutHandler);

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

feature1Router.put("/promptpay", promptPayHandler);

export default feature1Router;
