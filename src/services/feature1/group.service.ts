import { number } from "zod";
import {
  GroupCreateDBResponse,
  GroupIndexDBResponse,
} from "../../controllers/feature1/models/group.model";
import { IGroupRepository } from "./group.repository";

export interface IGroupService {
  addGroupById(requesterId: number, requesteeId: number): void;

  listGroupsOfUser(userId: number): Promise<GroupIndexDBResponse>;

  createGroup(
    userId: number,
    groupName: string,
    members: Array<number>,
  ): Promise<GroupCreateDBResponse>;
}

export default class GroupService implements IGroupService {
  constructor(readonly repository: IGroupRepository) {}

  async createGroup(
    userId: number,
    groupName: string,
    members: Array<number>,
  ): Promise<GroupCreateDBResponse> {
    return await this.repository.createGroup(userId, groupName, members);
  }

  async addGroupById(requesterId: number, requesteeId: number): Promise<void> {
    await this.repository.addGroupByUserName(requesterId, requesteeId);
  }

  async listGroupsOfUser(userId: number): Promise<GroupIndexDBResponse> {
    return await this.repository.listGroupsByUserId(userId);
  }
}
