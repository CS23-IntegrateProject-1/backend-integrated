import { Request, Response } from "express";
import { makeSearchWebResponse } from "./models/search.model";
import { makeErrorResponse } from "./models/payment_method.model";
import SearchRepository from "../../services/feature1/search.repository";
import SearchService, {
  ISearchService,
} from "../../services/feature1/search.service";

interface ISearchController {
  show: (req: Request, res: Response) => unknown;
}

export default class SearchController implements ISearchController {
  private service: ISearchService = new SearchService(new SearchRepository());

  async show(req: Request, res: Response) {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json(makeErrorResponse("Malformed request"));
    }

    try {
      const response = await this.service.searchByUserName(username.toString());

      const webResponse = makeSearchWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res.status(404).json(makeErrorResponse("User does not exist"));
    }
  }
}