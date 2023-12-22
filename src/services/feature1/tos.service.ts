import { Term_of_services } from "@prisma/client";
import {
  TosShowDBResponse,
  TosUpdateDBResponse,
} from "../../controllers/feature1/models/tos.model";
import { ITosRepository } from "./tos.repository";

export interface ITosService {
  getTosOfUser(userId: number): Promise<TosShowDBResponse>;

  updateTosOfUser(
    userId: number,
    consent: boolean,
  ): Promise<TosUpdateDBResponse>;

  storeTos(userId: number, consent: boolean): Promise<Term_of_services>;

  deleteTosOfUser(userId: number): Promise<void>;
}

export default class TosService implements ITosService {
  constructor(readonly repository: ITosRepository) {}

  async getTosOfUser(userId: number): Promise<TosShowDBResponse> {
    return this.repository.getTosByUserId(userId);
  }

  async updateTosOfUser(
    userId: number,
    consent: boolean,
  ): Promise<TosShowDBResponse> {
    return await this.repository.updateTosByUserId(userId, consent);
  }

  async storeTos(userId: number, consent: boolean): Promise<Term_of_services> {
    return await this.repository.storeTos(userId, consent);
  }

  async deleteTosOfUser(userId: number): Promise<void> {
    return await this.repository.deleteTosByUserId(userId);
  }
}
