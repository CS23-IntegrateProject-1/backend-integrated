import { Request, Response } from "express";
import { compose, path } from "ramda";
import { z } from "zod";

import {
  IProfileService,
  ProfileRepository,
  ProfileService,
} from "../../services/feature1";
import { MulterRequest, makeErrorResponse } from "./models";

export const getUserId = compose(Number, path(["params", "userId"]));

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
    const profile = req.body;
    const filename = (req as MulterRequest)?.file?.filename ?? null;

    const result = await ProfilePayload.safeParseAsync(profile);

    if (!result.success) {
      return res.status(400).json(makeErrorResponse("Invalid request"));
    }

    try {
      const response = await this.service.updateUserProfile(
        Number(req.params.userId),
        result.data,
        filename,
      );

      return res.json(response);
    } catch (e) {
      return res.status(404).json(makeErrorResponse("User not found"));
    }
  }

  async show(req: Request, res: Response) {
    try {
      const response = await this.service.getUserProfile(getUserId(req));

      return res.json(response);
    } catch (e) {
      return res.status(404).json(makeErrorResponse("User not found"));
    }
  }
}
