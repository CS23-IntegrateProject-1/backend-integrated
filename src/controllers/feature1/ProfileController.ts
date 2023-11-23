import { Request, Response } from "express";
import { ProfileRepository } from "../../services/feature1/profile.repository";
import ProfileService, {
  IProfileService,
} from "../../services/feature1/profile.service";

export interface IProfileController {
  show(req: Request, res: Response): unknown;
}

export default class ProfileController implements IProfileController {
  private service: IProfileService = new ProfileService(
    new ProfileRepository(),
  );

  async show(req: Request, res: Response) {
    const response = await this.service.getUserProfile(2);

    return res.json(response);
  }
}
