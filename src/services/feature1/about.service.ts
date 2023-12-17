import {
  AboutDestroyDBResponse,
  AboutShowDBResponse,
  AboutStoreDBResponse,
  AboutUpdateDBResponse,
} from "../../controllers/feature1/models/about.model";
import { IAboutRepository } from "./about.repository";

export interface IAboutService {
  allVersions(): Promise<[AboutShowDBResponse]>;

  latestAbout(): Promise<AboutShowDBResponse>;

  getAbout(id: number): Promise<AboutShowDBResponse>;

  storeAbout(version: string, detail: string): Promise<AboutStoreDBResponse>;

  updateAbout(
    id: number,
    version: string,
    detail: string,
  ): Promise<AboutUpdateDBResponse>;

  deleteAbout(id: number): Promise<void>;
}

export default class AboutService implements IAboutService {
  constructor(readonly repository: IAboutRepository) {}

  allVersions(): Promise<[AboutShowDBResponse]> {
    return this.repository.getAllAbouts();
  }

  latestAbout(): Promise<AboutShowDBResponse> {
    return this.repository.getLatestAbout();
  }

  async getAbout(id: number): Promise<AboutShowDBResponse> {
    return this.repository.getAboutById(id);
  }

  storeAbout(version: string, detail: string): Promise<AboutStoreDBResponse> {
    return this.repository.storeAbout(version, detail);
  }

  async updateAbout(
    id: number,
    version: string,
    detail: string,
  ): Promise<AboutUpdateDBResponse> {
    return this.repository.updateAboutById(id, version, detail);
  }

  async deleteAbout(id: number): Promise<void> {
    return await this.repository.deleteAboutById(id);
  }
}
