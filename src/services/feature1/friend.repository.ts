import {
  FriendRawDBResponse,
  FriendIndexDBResponse,
} from "../../controllers/feature1/models/friend.model";
import { map } from "ramda";
import { prismaClient } from "../../controllers/feature1.controller";

export interface IFriendRepository {
  addFriendByUserName(requesterId: number, requesteeId: number): void;

  listFriendsByUserId(userId: number): Promise<FriendIndexDBResponse>;
}

const transform = (data: FriendRawDBResponse) => {
  return {
    userId: data.User_Friendship_sencondUserIdToUser.userId,
    username: data.User_Friendship_sencondUserIdToUser.username,
    fname: data.User_Friendship_sencondUserIdToUser.fname,
    lname: data.User_Friendship_sencondUserIdToUser.lname,
    profile_picture: data.User_Friendship_sencondUserIdToUser.profile_picture,
    since: data.since,
    status: data.status,
  };
};

const stripUserIdsAndStatus = map(transform);

export default class FriendRepository {
  async listFriendsByUserId(userId: number): Promise<FriendIndexDBResponse> {
    const result = await prismaClient.friendship.findMany({
      where: {
        firstUserId: userId,
      },
      include: {
        User_Friendship_sencondUserIdToUser: {
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
    await prismaClient.friendship.create({
      data: {
        firstUserId: requesterId,
        sencondUserId: requesteeId,
        status: "Friend",
      },
    });
  }
}
