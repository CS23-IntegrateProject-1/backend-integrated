import { Request, Response } from "express";
import { isNil } from "ramda";
import {
  SearchDBResponse,
  makeErrorResponse,
  makeSearchWebResponse,
} from "./models";
import {
  ISearchService,
  SearchRepository,
  SearchService,
} from "../../services/feature1";

interface ISearchController {
  show: (req: Request, res: Response) => unknown;
}

export default class SearchController implements ISearchController {
  private service: ISearchService = new SearchService(new SearchRepository());

  async show(req: Request, res: Response) {
    const { username, phone } = req.query;

    try {
      let response: SearchDBResponse;

      if (!isNil(username)) {
        response = await this.service.searchByUserName(username.toString());
      } else if (!isNil(phone)) {
        response = await this.service.searchByPhone(phone.toString());
      } else {
        return res.status(400).json(makeErrorResponse("Malformed request"));
      }

      const webResponse = makeSearchWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res.status(404).json(makeErrorResponse("User does not exist"));
    }
  }
}
