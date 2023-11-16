import {
  PromptPayShowDBResponse,
  PromptPayUpdateDBResponse,
} from "../../controllers/feature1/models/promptpay.model";
import { IPromptPayRepository } from "./promptpay.repository";

export interface IPromptPayService {
  showPromptPayOfUser(userId: number): Promise<PromptPayShowDBResponse>;

  updatePromptPayOfUser(
    userId: number,
    promptPayNumber: number,
    phoneNumber: string,
  ): Promise<PromptPayUpdateDBResponse>;
}

export default class PromptPayService implements IPromptPayService {
  constructor(readonly repository: IPromptPayRepository) {}

  async showPromptPayOfUser(userId: number): Promise<PromptPayShowDBResponse> {
    return this.repository.showPromnptPayByUserId(userId);
  }

  async updatePromptPayOfUser(
    userId: number,
    promptPayNumber: number,
    phoneNumber: string,
  ): Promise<PromptPayUpdateDBResponse> {
    return this.repository.updatePromptPayByUserId(
      userId,
      promptPayNumber,
      phoneNumber,
    );
  }
}
