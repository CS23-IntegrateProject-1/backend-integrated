import { Request, Response } from "express";
import {
  IProfileService,
  ProfileRepository,
  ProfileService,
} from "../../services/feature1";
import { getUserId } from "./ProfileController";
import { makeErrorResponse } from "./models";
import { pick } from "ramda";
import qr from "qr-image";

interface IQrController {
  generate(req: Request, res: Response): unknown;
  generateByUsername(req: Request, res: Response): unknown;
}

export default class QrController implements IQrController {
  private service: IProfileService = new ProfileService(
    new ProfileRepository(),
  );

  async generate(req: Request, res: Response) {
    try {
      const response = await this.service.getUserProfile(getUserId(req));

      const pickQrFields = pick([
        "userId",
        "username",
        "gender",
        "birthday",
        "phone",
      ]);

      const fields = pickQrFields(response);

      res.type("png");
      res.setHeader("Content-Disposition", 'attachment; filename="qr.png"');
      return qr.image(JSON.stringify(fields), { type: "png" }).pipe(res);
    } catch (e) {
      return res.status(404).json(makeErrorResponse("User not found"));
    }
  }

  async generateByUsername(req: Request, res: Response) {
    try {
      const response = await this.service.getUserProfileByUsername(
        req.params.username,
      );

      const pickQrFields = pick([
        "userId",
        "username",
        "gender",
        "birthday",
        "phone",
      ]);

      const fields = pickQrFields(response);

      res.type("png");
      res.setHeader("Content-Disposition", 'attachment; filename="qr.png"');
      return qr.image(JSON.stringify(fields), { type: "png" }).pipe(res);
    } catch (e) {
      return res.status(404).json(makeErrorResponse("User not found"));
    }
  }
}
