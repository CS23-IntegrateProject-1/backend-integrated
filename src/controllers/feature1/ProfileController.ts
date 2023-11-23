import { Request, Response } from "express";
import { ProfileRepository } from "../../services/feature1/profile.repository";
import ProfileService, {
  IProfileService,
} from "../../services/feature1/profile.service";
import { extractToken } from "./utils";
import { makeErrorResponse } from "./models/payment_method.model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { z } from "zod";

export interface IProfileController {
  show(req: Request, res: Response): unknown;

  update(req: Request, res: Response): unknown;
}

const ProfilePayload = z.object({
  phone: z.string(),
  email: z.string().email(),
  birthday: z.string().datetime(),
  gender: z.enum(["Male", "Female", "Others"]),
});

export default class ProfileController implements IProfileController {
  private service: IProfileService = new ProfileService(
    new ProfileRepository(),
  );

  async update(req: Request, res: Response) {
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
      const profile = req.body;

      const result = await ProfilePayload.safeParseAsync(profile);

      if (!result.success) {
        console.log(result.error.issues);
        return res.status(400).json(makeErrorResponse("Invalid request"));
      }

      try {
        const response = await this.service.updateUserProfile(
          userId,
          result.data,
        );

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
