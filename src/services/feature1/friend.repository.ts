import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  FriendRawDBResponse,
  FriendIndexDBResponse,
} from "../../controllers/feature1/models/friend.model";
import { map } from "ramda";

export interface IFriendRepository {
  addFriendByUserName(requesterId: number, requesteeId: number): void;

  listFriendsByUserId(userId: number): Promise<FriendIndexDBResponse>;
}

const transform = (data: FriendRawDBResponse) => {
  return {
    userId: data.friend.userId,
    username: data.friend.username,
    fname: data.friend.fname,
    lname: data.friend.lname,
    profile_picture: data.friend.profile_picture,
    since: data.since,
    status: data.status,
  };
};

const stripUserIdsAndStatus = map(transform);

export default class FriendRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async listFriendsByUserId(userId: number): Promise<FriendIndexDBResponse> {
    const result = await this.prismaClient.friendship.findMany({
      where: {
        firstUserId: userId,
      },
      include: {
        friend: {
          select: {
            username: true,
            fname: true,
            lname: true,
            userId: true,
            profile_picture: true,
          },
        },
      },
    });

    return stripUserIdsAndStatus(result) as FriendIndexDBResponse;
  }

  async addFriendByUserName(
    requesterId: number,
    requesteeId: number,
  ): Promise<void> {
    await this.prismaClient.friendship.create({
      data: {
        firstUserId: requesterId,
        sencondUserId: requesteeId,
        status: "Friend",
      },
    });
  }
}
