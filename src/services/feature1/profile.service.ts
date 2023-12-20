import {
  ProfileShowDBResponse,
  ProfileUpdateDBResponse,
  ProfileUpdateRequest,
} from "../../controllers/feature1/models/profile.model";
import { IProfileRepository } from "./profile.repository";

export interface IProfileService {
  getUserProfile(userId: number): Promise<ProfileShowDBResponse>;

  updateUserProfile(
    userId: number,
    data: ProfileUpdateRequest,
    filename: string,
  ): Promise<ProfileUpdateDBResponse>;
}

export default class ProfileService implements IProfileService {
  constructor(readonly repository: IProfileRepository) {}

  async getUserProfile(userId: number): Promise<ProfileShowDBResponse> {
    return this.repository.getUserById(userId);
  }

  async updateUserProfile(
    userId: number,
    data: ProfileUpdateRequest,
    filename: string,
  ): Promise<ProfileUpdateDBResponse> {
    return this.repository.updateUserById(userId, data, filename);
  }
}
