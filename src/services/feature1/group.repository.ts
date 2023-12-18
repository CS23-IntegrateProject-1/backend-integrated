import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  GroupCreateDBResponse,
} from "../../controllers/feature1/models/group.model";

export interface IGroupRepository {
  createGroup(
    userId: number,
    groupName: string,
    members: Array<number>,
    filename: string|null,
  ): Promise<GroupCreateDBResponse>;
}

export default class GroupRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async createGroup(userId: number, groupName: string, members: Array<number>, filename: string) {
    const allMembers = new Set(members);
    allMembers.add(userId);

    const result = await this.prismaClient.group.create({
      data: {
        Group_user: {
          create: Array.from(allMembers).map((id) => ({ memberId: id })),
        },
        group_name: groupName,
        group_profile: filename,
      },
      include: {
        Group_user: {
          include: {
            member: {
              select: {
                userId: true,
                username: true,
                profile_picture: true,
              },
            },
          },
        },
      },
    });

    return result as unknown as GroupCreateDBResponse;
  }
}
