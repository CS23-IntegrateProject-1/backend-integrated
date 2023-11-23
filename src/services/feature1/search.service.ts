import { SearchDBResponse } from "../../controllers/feature1/models/search.model";
import { ISearchRepository } from "./search.repository";

export interface ISearchService {
  searchByUserName: (userName: string) => Promise<SearchDBResponse>;
}

export default class SearchService implements ISearchService {
  constructor(readonly repository: ISearchRepository) {}

  searchByUserName(userName: string): Promise<SearchDBResponse> {
    return this.repository.getUserByName(userName);
  }
}
