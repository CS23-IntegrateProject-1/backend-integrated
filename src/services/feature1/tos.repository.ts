import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma, PrismaClient } from "@prisma/client";

interface ITOSRepository {
  getTOSStatus(userId: number): Promise<boolean>;

  setTOSStatus(userId: number, consented: boolean): void;
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

  setTOSStatus(userId: number, consented: boolean) {}
}

export default TOSRepository;
