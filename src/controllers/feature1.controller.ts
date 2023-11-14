import { Response, Request } from "express";

import { PaymentMethodController } from "./feature1/PaymentMethodController";

export const getfeature1 = async (req: Request, res: Response) => {
  return res.json({});
};

export const accountHandler = async (req: Request, res: Response) => {};

export const privacyHandler = async (req: Request, res: Response) => {};

export const bioFetchHandler = async (req: Request, res: Response) => {};

export const helpHandler = async (req: Request, res: Response) => {};

export const aboutHandler = async (req: Request, res: Response) => {};

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
