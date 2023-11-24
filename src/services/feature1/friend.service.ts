import { FriendIndexDBResponse } from "../../controllers/feature1/models/friend.model";
import { IFriendRepository } from "./friend.repository";

export interface IFriendService {
  addFriendById(requesterId: number, requesteeId: number): void;

  listFriendsOfUser(userId: number): Promise<FriendIndexDBResponse>;
}

export default class FriendService implements IFriendService {
  constructor(readonly repository: IFriendRepository) {}

  async addFriendById(requesterId: number, requesteeId: number): Promise<void> {
    await this.repository.addFriendByUserName(requesterId, requesteeId);
  }

  async listFriendsOfUser(userId: number): Promise<FriendIndexDBResponse> {
    return await this.repository.listFriendsByUserId(userId);
  }
}
