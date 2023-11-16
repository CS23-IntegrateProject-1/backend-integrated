import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  PromptPayShowDBResponse,
  PromptPayUpdateDBResponse,
} from "../../controllers/feature1/models/promptpay.model";

export interface IPromptPayRepository {
  showPromnptPayByUserId(userId: number): Promise<PromptPayShowDBResponse>;

  updatePromptPayByUserId(
    userId: number,
    promptPayNumber: number,
    phoneNumber: string,
  ): Promise<PromptPayUpdateDBResponse>;
}

export default class PromptPayRepository implements IPromptPayRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async showPromnptPayByUserId(
    userId: number,
  ): Promise<PromptPayShowDBResponse> {
    const result = await this.prismaClient.user.findFirst({
      where: {
        userId,
      },
      select: {
        userId: true,
        username: true,
        prompt_pay: true,
        phone: true,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as PromptPayShowDBResponse;
    }
  }

  async updatePromptPayByUserId(
    userId: number,
    promptPayNumber: number,
    phoneNumber: string,
  ): Promise<PromptPayUpdateDBResponse> {
    const result = await this.prismaClient.user.update({
      where: {
        userId,
      },
      data: {
        prompt_pay: promptPayNumber,
        phone: phoneNumber,
      },
      select: {
        userId: true,
        username: true,
        prompt_pay: true,
        phone: true,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as PromptPayUpdateDBResponse;
    }
  }
}
