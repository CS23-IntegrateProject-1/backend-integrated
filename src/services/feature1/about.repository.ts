import { PrismaClient } from "@prisma/client";
import {
  DefaultArgs,
  PrismaClientOptions,
} from "@prisma/client/runtime/library";
import {
  AboutShowDBResponse,
  AboutStoreDBResponse,
  AboutUpdateDBResponse,
  AboutDestroyDBResponse,
} from "../../controllers/feature1/models/about.model";

export interface IAboutRepository {
  getAllAbouts(): Promise<[AboutShowDBResponse]>;

  getLatestAbout(): Promise<AboutShowDBResponse>;

  getAboutById(id: number): Promise<AboutShowDBResponse>;

  storeAbout(version: string, detail: string): Promise<AboutStoreDBResponse>;

  updateAboutById(
    id: number,
    version: string,
    detail: string,
  ): Promise<AboutUpdateDBResponse>;

  deleteAboutById(id: number): Promise<void>;
}

export default class AboutRepository implements IAboutRepository {
  private prismaClient: PrismaClient<PrismaClientOptions, never, DefaultArgs>;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getAllAbouts(): Promise<[AboutShowDBResponse]> {
    const result = await this.prismaClient.about_app.findMany({});

    if (result === null) {
      throw new Error("No About found");
    } else {
      return result as unknown as [AboutShowDBResponse];
    }
  }

  async getLatestAbout(): Promise<AboutShowDBResponse> {
    const result = await this.prismaClient.about_app.findFirst({
      orderBy: [{ last_update: "desc" }],
      take: 1,
    });

    if (result === null) {
      throw new Error("No About found");
    } else {
      return result as AboutShowDBResponse;
    }
  }

  async getAboutById(id: number): Promise<AboutShowDBResponse> {
    const result = await this.prismaClient.about_app.findFirst({
      where: {
        aboutAppId: id,
      },
    });

    if (result === null) {
      throw new Error("About not found");
    } else {
      return result as AboutShowDBResponse;
    }
  }

  storeAbout(version: string, detail: string): Promise<AboutStoreDBResponse> {
    return this.prismaClient.about_app.create({
      data: {
        version,
        detail,
        last_update: new Date(),
      },
    });
  }

  async updateAboutById(
    id: number,
    version: string,
    detail: string,
  ): Promise<AboutUpdateDBResponse> {
    return this.prismaClient.about_app.update({
      where: {
        aboutAppId: id,
      },
      data: {
        version,
        detail,
      },
    });
  }

  async deleteAboutById(id: number): Promise<void> {
    await this.prismaClient.about_app.delete({
      where: {
        aboutAppId: id,
      },
    });
  }
}
