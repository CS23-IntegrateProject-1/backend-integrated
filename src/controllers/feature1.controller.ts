import { Response, Request } from "express";

import { PaymentMethodController } from "./feature1/PaymentMethodController";
import { TosController } from "./feature1/TosController";
import { PrivacyPolicyController } from "./feature1/PrivacyPolicyController";
import { PromptPayController } from "./feature1/PromptPayController";
import GroupController from "./feature1/GroupController";
import { PrismaClient } from "@prisma/client";
import VenueController from "./feature1/VenueController";

export const prismaClient = new PrismaClient();

export const getfeature1 = async (req: Request, res: Response) => {
  return res.json({});
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

export const groupInfoHandler = async (req: Request, res: Response) => {
  return new GroupController().show(req, res);
};
