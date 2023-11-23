import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  PrivacyPolicyShowDBResponse,
  PrivacyPolicyStoreDBResponse,
  PrivacyPolicyUpdateDBResponse,
} from "../../controllers/feature1/models/privacy_policy.model";

export interface IPrivacyPolicyRepository {
  getPrivacyPolicyByUserId(
    userId: number,
  ): Promise<PrivacyPolicyShowDBResponse>;

  updatePrivacyPolicyByUserId(
    userId: number,
    privacyConsent: boolean,
    cookieConsent: boolean,
  ): Promise<PrivacyPolicyUpdateDBResponse>;

  storePrivacyPolicy(
    userId: number,
    privacyConsent: boolean,
    cookieConsent,
  ): Promise<PrivacyPolicyStoreDBResponse>;

  deletePrivacyPolicyByUserId(userId: number): Promise<void>;
}

export default class PrivacyPolicyRepository
  implements IPrivacyPolicyRepository
{
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getPrivacyPolicyByUserId(
    userId: number,
  ): Promise<PrivacyPolicyShowDBResponse> {
    const result = await this.prismaClient.privacy_policies.findFirst({
      where: {
        userId,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as PrivacyPolicyShowDBResponse;
    }
  }

  async updatePrivacyPolicyByUserId(
    userId: number,
    privacyConsent: boolean,
    cookieConsent: boolean,
  ): Promise<PrivacyPolicyUpdateDBResponse> {
    const result = await this.prismaClient.privacy_policies.update({
      where: {
        userId,
      },
      data: {
        privacy_consent: privacyConsent,
        cookie_consent: cookieConsent,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as PrivacyPolicyUpdateDBResponse;
    }
  }

  async storePrivacyPolicy(
    userId: number,
    privacyConsent: boolean,
    cookieConsent: boolean,
  ): Promise<PrivacyPolicyStoreDBResponse> {
    const result = await this.prismaClient.privacy_policies.create({
      data: {
        userId,
        privacy_consent: privacyConsent,
        cookie_consent: cookieConsent,
      },
    });

    return result as PrivacyPolicyStoreDBResponse;
  }

  async deletePrivacyPolicyByUserId(userId: number): Promise<void> {
    await this.prismaClient.privacy_policies.delete({
      where: {
        userId,
      },
    });
  }
}
