import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { SearchDBResponse } from "../../controllers/feature1/models/search.model";

export interface ISearchRepository {
  getUserByName(userName: string): Promise<SearchDBResponse>;

  getUserByPhone(phone: string): Promise<SearchDBResponse>;
}

export default class SearchRepository implements ISearchRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getUserByPhone(phone: string): Promise<SearchDBResponse> {
    const result = await this.prismaClient.user.findFirst({
      where: {
        phone,
      },
      select: {
        userId: true,
        fname: true,
        lname: true,
        username: true,
        profile_picture: true,
      },
    });

    if (result === null) {
      throw new Error("User does not exist");
    } else {
      return result as SearchDBResponse;
    }
  }

  async getUserByName(userName: string): Promise<SearchDBResponse> {
    const result = await this.prismaClient.user.findFirst({
      where: {
        username: userName,
      },
      select: {
        userId: true,
        fname: true,
        lname: true,
        username: true,
        profile_picture: true,
      },
    });

    if (result === null) {
      throw new Error("User does not exist");
    } else {
      return result as SearchDBResponse;
    }
  }
}
