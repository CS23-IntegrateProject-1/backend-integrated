import { Router } from "express";
import multerConfig from "../multerConfig";

import {
  userAuthMiddleware,
  businessAuthMiddleware,
  adminAuthMiddleware,
} from "../middlewares/feature1.middleware";
import {
  AboutController,
  FriendController,
  GroupController,
  HelpDeskController,
  PaymentMethodController,
  PrivacyPolicyController,
  ProfileController,
  PromptPayController,
  QrController,
  SearchController,
  TosController,
  VenueController,
} from "../controllers/feature1";

const aboutController = new AboutController();
const friendController = new FriendController();
const groupController = new GroupController();
const helpDeskController = new HelpDeskController();
const paymentMethodController = new PaymentMethodController();
const privacyPolicyController = new PrivacyPolicyController();
const profileController = new ProfileController();
const promptPayController = new PromptPayController();
const qrController = new QrController();
const searchController = new SearchController();
const tosController = new TosController();
const venueController = new VenueController();

const feature1Router = Router();

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

feature1Router.get(
  "/term-of-services",
  userAuthMiddleware,
  tosController.show.bind(tosController),
);
feature1Router.post(
  "/term-of-services",
  userAuthMiddleware,
  tosController.store.bind(tosController),
);
feature1Router.put(
  "/term-of-services",
  userAuthMiddleware,
  tosController.update.bind(tosController),
);
feature1Router.delete(
  "/term-of-services",
  userAuthMiddleware,
  tosController.destroy.bind(tosController),
);

feature1Router.get(
  "/payment-method",
  userAuthMiddleware,
  paymentMethodController.show.bind(paymentMethodController),
);
feature1Router.post(
  "/payment-method",
  userAuthMiddleware,
  paymentMethodController.store.bind(paymentMethodController),
);
feature1Router.put(
  "/payment-method",
  userAuthMiddleware,
  paymentMethodController.update.bind(paymentMethodController),
);
feature1Router.delete(
  "/payment-method",
  userAuthMiddleware,
  paymentMethodController.destroy.bind(paymentMethodController),
);

feature1Router.get(
  "/privacy-policy",
  userAuthMiddleware,
  privacyPolicyController.show.bind(privacyPolicyController),
);
feature1Router.post(
  "/privacy-policy",
  userAuthMiddleware,
  privacyPolicyController.store.bind(privacyPolicyController),
);
feature1Router.put(
  "/privacy-policy",
  userAuthMiddleware,
  privacyPolicyController.update.bind(privacyPolicyController),
);
feature1Router.delete(
  "/privacy-policy",
  userAuthMiddleware,
  privacyPolicyController.destroy.bind(privacyPolicyController),
);

feature1Router.get(
  "/promptpay",
  userAuthMiddleware,
  promptPayController.show.bind(promptPayController),
);
feature1Router.put(
  "/promptpay",
  userAuthMiddleware,
  promptPayController.update.bind(promptPayController),
);

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
feature1Router.get(
  "/group/:id",
  userAuthMiddleware,
  groupController.show.bind(groupController),
);
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
feature1Router.get(
  "/admin/venue/:venueId",
  adminAuthMiddleware,
  venueController.show.bind(venueController),
)
feature1Router.put(
  "/venue/info",
  businessAuthMiddleware,
  multerConfig.single("avatar"),
  venueController.update.bind(venueController),
);
feature1Router.put(
  "/admin/venue/info/:venueId",
  adminAuthMiddleware,
  multerConfig.single("avatar"),
  venueController.update.bind(venueController),
)
feature1Router.get(
  "/venue/promptpay",
  businessAuthMiddleware,
  venueController.showPromptPay.bind(venueController),
);
feature1Router.get(
  "/admin/venue/promptpay/:venueId",
  adminAuthMiddleware,
  venueController.showPromptPay.bind(venueController),
)
feature1Router.put(
  "/venue/promptpay",
  businessAuthMiddleware,
  venueController.updatePromptPay.bind(venueController),
);
feature1Router.put(
  "/admin/venue/promptpay/:venueId",
  adminAuthMiddleware,
  venueController.updatePromptPay.bind(venueController),
)
feature1Router.put(
  "/venue/opening_hours",
  businessAuthMiddleware,
  venueController.updateOpeningHours.bind(venueController),
);
feature1Router.put(
  "/admin/venue/opening_hours/:venueId",
  adminAuthMiddleware,
  venueController.updateOpeningHours.bind(venueController),
)
feature1Router.get(
  "/venue/opening_hours",
  businessAuthMiddleware,
  venueController.showOpeningHours.bind(venueController),
);
feature1Router.get(
  "/admin/venue/opening_hours/:venueId",
  adminAuthMiddleware,
  venueController.showOpeningHours.bind(venueController),
)
feature1Router.post(
  "/venue/credit_card",
  businessAuthMiddleware,
  venueController.createCreditCard.bind(venueController),
);
feature1Router.post(
  "/admin/venue/credit_card/:venueId",
  adminAuthMiddleware,
  venueController.createCreditCard.bind(venueController),
)
feature1Router.get(
  "/venue/credit_card",
  businessAuthMiddleware,
  venueController.indexCreditCard.bind(venueController),
);
feature1Router.get(
  "/admin/venue/credit_card/:venueId",
  adminAuthMiddleware,
  venueController.indexCreditCard.bind(venueController),
)
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
  "/venue/price_range",
  businessAuthMiddleware,
  venueController.showPriceRange.bind(venueController),
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
feature1Router.get(
  "/help_desk/ticket",
  userAuthMiddleware,
  helpDeskController.index.bind(helpDeskController),
);

export default feature1Router;
