import { PromptPayUpdateDBResponse } from "../../controllers/feature1/models/promptpay.model";
import { IPromptPayRepository } from "./promptpay.repository";

export interface IPromptPayService {
  updatePromptPayOfUser(
    userId: number,
    promptPayNumber: number,
  ): Promise<PromptPayUpdateDBResponse>;
}

export default class PromptPayService implements IPromptPayService {
  constructor(readonly repository: IPromptPayRepository) {}

  async updatePromptPayOfUser(
    userId: number,
    promptPayNumber: number,
  ): Promise<PromptPayUpdateDBResponse> {
    return this.repository.updatePromptPayByUserId(userId, promptPayNumber);
  }
}
