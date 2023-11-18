import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  TosShowDBResponse,
  TosStoreDBResponse,
  TosUpdateDBResponse,
} from "../../controllers/feature1/models/tos.model";

export interface ITosRepository {
  getTosByUserId(userId: number): Promise<TosShowDBResponse>;

  updateTosByUserId(
    userId: number,
    consent: boolean,
  ): Promise<TosUpdateDBResponse>;

  storeTos(userId: number, consent: boolean): Promise<TosStoreDBResponse>;

  deleteTosByUserId(userId: number): Promise<void>;
}

export default class TosRepository implements ITosRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getTosByUserId(userId: number): Promise<TosShowDBResponse> {
    const result = await this.prismaClient.term_of_services.findFirst({
      where: {
        userId,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as TosShowDBResponse;
    }
  }

  async updateTosByUserId(
    userId: number,
    consent: boolean,
  ): Promise<TosUpdateDBResponse> {
    const result = await this.prismaClient.term_of_services.update({
      where: {
        userId,
      },
      data: {
        privacy_consent: consent,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as TosUpdateDBResponse;
    }
  }

  async storeTos(
    userId: number,
    consent: boolean,
  ): Promise<TosStoreDBResponse> {
    const result = await this.prismaClient.term_of_services.create({
      data: {
        userId,
        privacy_consent: consent,
      },
    });

    return result as TosStoreDBResponse;
  }

  async deleteTosByUserId(userId: number): Promise<void> {
    await this.prismaClient.term_of_services.delete({
      where: {
        userId,
      },
    });
  }
}
