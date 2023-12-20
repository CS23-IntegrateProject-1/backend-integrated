import { GroupCreateDBResponse } from "../../controllers/feature1/models/group.model";
import { IGroupRepository } from "./group.repository";

export interface IGroupService {
  createGroup(
    userId: number,
    groupName: string,
    members: Array<number>,
    filename: string | null,
    secret: boolean,
  ): Promise<GroupCreateDBResponse>;
}

export default class GroupService implements IGroupService {
  constructor(readonly repository: IGroupRepository) {}

  async createGroup(
    userId: number,
    groupName: string,
    members: Array<number>,
    filename: string | null,
    secret: boolean,
  ): Promise<GroupCreateDBResponse> {
    return await this.repository.createGroup(
      userId,
      groupName,
      members,
      filename,
      secret,
    );
  }
}