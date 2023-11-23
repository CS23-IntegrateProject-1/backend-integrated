import { Response, Request } from "express";

import { PaymentMethodController } from "./feature1/PaymentMethodController";
import { TosController } from "./feature1/TosController";
import { PrivacyPolicyController } from "./feature1/PrivacyPolicyController";
import { AboutController } from "./feature1/AboutController";
import { PromptPayController } from "./feature1/PromptPayController";
import SearchController from "./feature1/SearchController";
import FriendController from "./feature1/FriendController";
import ProfileController from "./feature1/ProfileController";

export const getfeature1 = async (req: Request, res: Response) => {
  return res.json({});
};

export const aboutHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return new AboutController().store(req, res);
    case "PUT":
      return new AboutController().update(req, res);
    case "DELETE":
      return new AboutController().destroy(req, res);
    case "GET":
    default:
      return new AboutController().show(req, res);
  }
};

export const paymentMethodHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return new PaymentMethodController().store(req, res);
    case "PUT":
      return new PaymentMethodController().update(req, res);
    case "DELETE":
      return new PaymentMethodController().destroy(req, res);
    case "GET":
    default:
      return new PaymentMethodController().show(req, res);
  }
};

export const tosHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return new TosController().store(req, res);
    case "PUT":
      return new TosController().update(req, res);
    case "DELETE":
      return new TosController().destroy(req, res);
    case "GET":
    default:
      return new TosController().show(req, res);
  }
};

export const privacyPolicyHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return new PrivacyPolicyController().store(req, res);
    case "PUT":
      return new PrivacyPolicyController().update(req, res);
    case "DELETE":
      return new PrivacyPolicyController().destroy(req, res);
    case "GET":
    default:
      return new PrivacyPolicyController().show(req, res);
  }
};

export const promptPayHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "PUT":
      return new PromptPayController().update(req, res);
    case "GET":
    default:
      return new PromptPayController().show(req, res);
  }
};

export const searchHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
    default:
      return new SearchController().show(req, res);
  }
};

export const friendHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return new FriendController().addFriend(req, res);
    case "GET":
    default:
      return new FriendController().index(req, res);
  }
};

export const profileHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
    default:
      return new ProfileController().show(req, res);
  }
};
