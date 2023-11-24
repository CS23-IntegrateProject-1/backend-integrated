import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  GroupRawDBResponse,
  GroupIndexDBResponse,
  GroupCreateDBResponse,
} from "../../controllers/feature1/models/group.model";
import { map } from "ramda";

export interface IGroupRepository {
  createGroup(
    userId: number,
    groupName: string,
    members: Array<number>,
  ): Promise<GroupCreateDBResponse>;

  addGroupByUserName(requesterId: number, requesteeId: number): void;

  listGroupsByUserId(userId: number): Promise<GroupIndexDBResponse>;
}

const transform = (data: GroupRawDBResponse) => {
  return {
    userId: data.group.userId,
    username: data.group.username,
    fname: data.group.fname,
    lname: data.group.lname,
    profile_picture: data.group.profile_picture,
    since: data.since,
    status: data.status,
  };
};

const stripUserIdsAndStatus = map(transform);

export default class GroupRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async createGroup(userId: number, groupName: string, members: Array<number>) {
    const allMembers = new Set(members);
    allMembers.add(userId);

    const result = await this.prismaClient.group.create({
      data: {
        Group_user: {
          create: members.map((id) => ({ memberId: id })),
        },
        group_name: groupName,
      },
      include: {
        Group_user: true,
      },
    });

    return result as GroupCreateDBResponse;
  }

  async listGroupsByUserId(userId: number): Promise<GroupIndexDBResponse> {
    /*
    const result = await this.prismaClient.group.findMany({
      where: {
        firstUserId: userId,
      },
      include: {
        group: {
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

    return stripUserIdsAndStatus(result) as GroupIndexDBResponse;
    */
    return {} as GroupIndexDBResponse;
  }

  async addGroupByUserName(
    requesterId: number,
    requesteeId: number,
  ): Promise<void> {
    /*
    await this.prismaClient.group.create({
      data: {
        firstUserId: requesterId,
        sencondUserId: requesteeId,
        status: "Group",
      },
    });
    */
  }
}
