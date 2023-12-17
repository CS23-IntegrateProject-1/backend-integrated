import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  BioRequest,
  BioResponse,
} from "../../controllers/feature1/models/bios.model";

interface IBioRepository {
  getBio(userId: number): Promise<BioResponse>;

  setBio(bio: BioRequest): Promise<BioResponse>;
}

class BioRespository implements IBioRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getBio(userId: number): Promise<BioResponse> {
    const bioResult = await this.prismaClient.user_bio.findFirst({
      where: {
        userId,
      },
    });

    if (!bioResult) {
      throw Error("User not found");
    }

    return {
      userId: bioResult.userId,
      birthdate: bioResult.birthday!!,
      gender: bioResult.gender,
    };
  }

  async setBio(bio: BioRequest): Promise<BioResponse> {
    return { userId: 1, birthdate: new Date(), gender: "Male" };
  }
}
