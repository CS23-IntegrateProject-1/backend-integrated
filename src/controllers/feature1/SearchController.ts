import { Request, Response } from "express";
import { makeSearchWebResponse } from "./models/search.model";
import { makeErrorResponse } from "./models/payment_method.model";
import SearchRepository from "../../services/feature1/search.repository";
import SearchService, {
  ISearchService,
} from "../../services/feature1/search.service";
import { isNil } from 'ramda';

interface ISearchController {
  show: (req: Request, res: Response) => unknown;
}

export default class SearchController implements ISearchController {
  private service: ISearchService = new SearchService(new SearchRepository());

  async show(req: Request, res: Response) {
    const { username, phone } = req.query;

    if (!username && !phone) {
      return res.status(400).json(makeErrorResponse("Malformed request"));
    }

    if (!isNil(username)) {
      try {
        const response = await this.service.searchByUserName(
          username.toString(),
        );

        const webResponse = makeSearchWebResponse(response);

        return res.json(webResponse);
      } catch (e) {
        return res.status(404).json(makeErrorResponse("User does not exist"));
      }
    }

    if (!isNil(phone)) {
      try {
        const response = await this.service.searchByPhone(phone.toString());

        const webResponse = makeSearchWebResponse(response);

        return res.json(webResponse);
      } catch (e) {
        return res.status(404).json(makeErrorResponse("User does not exist"));
      }
    }
  }
}
