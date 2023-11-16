import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PromptPayUpdateDBResponse } from "../../controllers/feature1/models/promptpay.model";

export interface IPromptPayRepository {
  updatePromptPayByUserId(
    userId: number,
    promptPayNumber: number,
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

  async updatePromptPayByUserId(
    userId: number,
    promptPayNumber: number,
  ): Promise<PromptPayUpdateDBResponse> {
    const result = await this.prismaClient.user.update({
      where: {
        userId,
      },
      data: {
        prompt_pay: promptPayNumber,
      },
      select: {
        userId: true,
        username: true,
        prompt_pay: true,
      },
    });

    console.log(result);

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as PromptPayUpdateDBResponse;
    }
  }
}
