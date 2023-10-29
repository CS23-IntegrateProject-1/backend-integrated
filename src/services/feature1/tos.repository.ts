import {
  DefaultArgs,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { Prisma, PrismaClient } from "@prisma/client";
import { TOSResponse } from "../../controllers/feature1/models/TOS.model";

interface ITOSRepository {
  getTOSStatus(userId: number): Promise<boolean>;

  setTOSStatus(userId: number, consented: boolean): Promise<TOSResponse>;
}

class TOSRepository implements ITOSRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;
  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getTOSStatus(userId: number): Promise<boolean> {
    const consentResult = await this.prismaClient.term_of_services.findFirst({
      where: {
        userId,
      },
    });

    if (!consentResult) {
      throw Error("User not found");
    }

    return !!consentResult.term_consent;
  }

  async setTOSStatus(userId: number, consented: boolean): Promise<TOSResponse> {
    try {
      const consentResult = await this.prismaClient.term_of_services.update({
        where: {
          userId,
        },
        data: {
          term_consent: consented,
        },
      });

      return {
        user_id: consentResult.userId,
        consented: consentResult.term_consent!!,
      };
    } catch (e: unknown) {
      if ((e as PrismaClientKnownRequestError).code === "P2025") {
        throw new Error("User not found");
      }
      throw new Error("Unknown database error");
    }
  }
}

export default TOSRepository;
