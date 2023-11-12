import { Response, Request } from "express";

import TOSRepository from "../services/feature1/tos.repository";
import TOSService from "../services/feature1/tos.service";
import { PaymentMethodController } from "./feature1/PaymentMethodController";
import { TOSResponse } from "./feature1/models/tos.model";

export const getfeature1 = async (req: Request, res: Response) => {
  return res.json({});
};

export const accountHandler = async (req: Request, res: Response) => {};

export const privacyHandler = async (req: Request, res: Response) => {};

// TODO: @SoeThandarLwin Let authenticated and authorized users access this
// TODO: @SoeThandarLwin Implement better validation
export const termOfServiceChangeHandler = async (
  req: Request,
  res: Response,
) => {
  const { user_id: userId, consent } = req.body;

  const tosService = new TOSService(new TOSRepository());
  try {
    const tosStatus = await tosService.setTOSStatus(userId, consent);
    return res.json(tosStatus);
  } catch (e) {
    return res.status(404).json({
      message: "user not found",
    });
  }
};

// TODO: @SoeThandarLwin Let authenticated and authorized users access this
// TODO: @SoeThandarLwin Implement better validation
export const termOfServiceHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      const { userId } = req.query;
      let userIdNum: number;

      userIdNum = Number(userId);

      if (Number.isNaN(userIdNum)) {
        return res.status(400).json({
          message: "malformed user id",
        });
      }

      const tosService = new TOSService(new TOSRepository());
      let consent: boolean;

      try {
        consent = await tosService.getTOSStatus(userIdNum);
      } catch (e) {
        return res.status(404).json({
          message: "user not found",
        });
      }

      const tosStatus: TOSResponse = {
        user_id: userIdNum,
        consented: consent,
      };

      return res.json(tosStatus);
    default:
  }
};

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
