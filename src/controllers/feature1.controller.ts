import TOSRepository from "../services/feature1/tos.repository";
import TOSService from "../services/feature1/tos.service";

import { Response, Request } from "express";
import { TOS } from "./feature1/models/TOS.model";

export const getfeature1 = async (req: Request, res: Response) => {
  return res.json({});
};

export const accountHandler = async (req: Request, res: Response) => {};

export const notificationHandler = async (req: Request, res: Response) => {};

export const privacyHandler = async (req: Request, res: Response) => {};

// TODO: @SoeThandarLwin Let authenticated and authorized users access this
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

      const tosStatus: TOS = {
        user_id: userIdNum,
        consented: consent,
      };

      return res.json(tosStatus);
    default:
  }
};

export const helpHandler = async (req: Request, res: Response) => {};

export const aboutHandler = async (req: Request, res: Response) => {};
