import {
  PrivacyPolicyShowDBResponse,
  PrivacyPolicyStoreDBResponse,
  PrivacyPolicyUpdateDBResponse,
} from "../../controllers/feature1/models/privacy_policy.model";
import { IPrivacyPolicyRepository } from "./privacy_policy.repository";

export interface IPrivacyPolicyService {
  getPrivacyPolicyOfUser(userId: number): Promise<PrivacyPolicyShowDBResponse>;

  updatePrivacyPolicyOfUser(
    userId: number,
    privacyConsent: boolean,
    cookieConsent: boolean,
  ): Promise<PrivacyPolicyUpdateDBResponse>;

  storePrivacyPolicy(
    userId: number,
    privacyConsent: boolean,
    cookieConsent: boolean,
  ): Promise<PrivacyPolicyStoreDBResponse>;

  deletePrivacyPolicyOfUser(userId: number): Promise<void>;
}

export default class PrivacyPolicyService implements IPrivacyPolicyService {
  constructor(readonly repository: IPrivacyPolicyRepository) {}

  async getPrivacyPolicyOfUser(
    userId: number,
  ): Promise<PrivacyPolicyShowDBResponse> {
    try {
      return this.repository.getPrivacyPolicyByUserId(userId);
    } catch (e) {
      throw e;
    }
  }

  async updatePrivacyPolicyOfUser(
    userId: number,
    privacyConsent: boolean,
    cookieConsent: boolean,
  ): Promise<PrivacyPolicyShowDBResponse> {
    return await this.repository.updatePrivacyPolicyByUserId(
      userId,
      privacyConsent,
      cookieConsent,
    );
  }

  async storePrivacyPolicy(
    userId: number,
    privacyConsent: boolean,
    cookieConsent: boolean,
  ): Promise<PrivacyPolicyStoreDBResponse> {
    return await this.repository.storePrivacyPolicy(
      userId,
      privacyConsent,
      cookieConsent,
    );
  }

  async deletePrivacyPolicyOfUser(userId: number): Promise<void> {
    return await this.repository.deletePrivacyPolicyByUserId(userId);
  }
}
