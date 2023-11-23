import { ProfileShowDBResponse } from "../../controllers/feature1/models/profile.model";
import { IProfileRepository } from "./profile.repository";

export interface IProfileService {
  getUserProfile(userId: number): Promise<ProfileShowDBResponse>;
}

export default class ProfileService implements IProfileService {
  constructor(readonly repository: IProfileRepository) {}

  async getUserProfile(userId: number): Promise<ProfileShowDBResponse> {
    return this.repository.getUserById(userId);
  }
}
