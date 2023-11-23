import { Request, Response } from "express";
import { ProfileRepository } from "../../services/feature1/profile.repository";
import ProfileService, {
  IProfileService,
} from "../../services/feature1/profile.service";
import { extractToken } from "./utils";
import { makeErrorResponse } from "./models/payment_method.model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export interface IProfileController {
  show(req: Request, res: Response): unknown;
}

export default class ProfileController implements IProfileController {
  private service: IProfileService = new ProfileService(
    new ProfileRepository(),
  );

  async show(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

      try {
        const response = await this.service.getUserProfile(userId);

        return res.json(response);
      } catch (e) {
        return res.status(404).json(makeErrorResponse("User not found"));
      }
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }
    }
  }
}
