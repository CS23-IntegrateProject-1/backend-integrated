import {
  TosShowDBResponse,
  TosStoreDBResponse,
  TosUpdateDBResponse,
} from "../../controllers/feature1/models/tos.model";
import { ITosRepository } from "./tos.repository";

export interface ITosService {
  getTosOfUser(userId: number): Promise<TosShowDBResponse>;

  updateTosOfUser(
    userId: number,
    consent: boolean,
  ): Promise<TosUpdateDBResponse>;

  storeTos(userId: number, consent: boolean): Promise<TosStoreDBResponse>;

  deleteTosOfUser(userId: number): Promise<void>;
}

export default class TosService implements ITosService {
  constructor(readonly repository: ITosRepository) {}

  async getTosOfUser(userId: number): Promise<TosShowDBResponse> {
    try {
      return this.repository.getTosByUserId(userId);
    } catch (e) {
      throw e;
    }
  }

  async updateTosOfUser(
    userId: number,
    consent: boolean,
  ): Promise<TosShowDBResponse> {
    return await this.repository.updateTosByUserId(userId, consent);
  }

  async storeTos(
    userId: number,
    consent: boolean,
  ): Promise<TosStoreDBResponse> {
    return await this.repository.storeTos(userId, consent);
  }

  async deleteTosOfUser(userId: number): Promise<void> {
    return await this.repository.deleteTosByUserId(userId);
  }
}
