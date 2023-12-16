import { Response, Request } from "express";
import AboutService, {
  IAboutService,
} from "../../services/feature1/about.service";
import AboutRepository from "../../services/feature1/about.repository";
import { makeErrorResponse } from "./models/payment_method.model";
import {
  makeAboutShowWebResponse,
  makeAboutIndexWebResponse,
  makeAboutStoreWebResponse,
  makeAboutUpdateWebResponse,
} from "./models/about.model";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export interface IAboutController {
  store: (req: Request, res: Response) => unknown;
  show: (req: Request, res: Response) => unknown;
  update: (req: Request, res: Response) => unknown;
  destroy: (req: Request, res: Response) => unknown;
}

export class AboutController implements IAboutController {
  private service: IAboutService = new AboutService(new AboutRepository());

  async store(req: Request, res: Response) {
    try {
      let { version, detail } = req.body;

      if (typeof version !== "string") {
        return res.status(400).json(makeErrorResponse("Malformed request"));
      }

      if (typeof detail !== "string") {
        detail = "";
      }

      try {
        const response = await this.service.storeAbout(version, detail);

        const webResponse = makeAboutStoreWebResponse(response);

        return res.json(webResponse);
      } catch (e) {
        if (e instanceof PrismaClientValidationError) {
          return res.status(400).send();
        } else if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            return res
              .status(409)
              .json(makeErrorResponse("About already exists"))
              .send();
          }
        } else {
          return res.status(500).send();
        }
      }
    } catch (e) {
      return res.status(404).json(makeErrorResponse("About not found"));
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.query;

      const idNum: number = Number(id);

      if (!isNaN(idNum)) {
        const response = await this.service.getAbout(idNum);
        const webResponse = makeAboutShowWebResponse(response);

        res.json(webResponse);
      } else if (req.query.hasOwnProperty("latest")) {
        const response = await this.service.latestAbout();
        const webResponse = makeAboutShowWebResponse(response);

        return res.json(webResponse);
      } else {
        const response = await this.service.allVersions();
        const webResponse = makeAboutIndexWebResponse(response);

        return res.json(webResponse);
      }
    } catch (e) {
      return res.status(404).json(makeErrorResponse("About not found"));
    }
  }

  async update(req: Request, res: Response) {
    let { id, version, detail } = req.body;

    const idNum = Number(id);

    if (isNaN(idNum) || typeof version !== "string") {
      return res.status(400).json(makeErrorResponse("Malformed request"));
    }

    if (typeof detail !== "string") {
      detail = "";
    }

    try {
      const response = await this.service.updateAbout(idNum, version, detail);

      const webResponse = makeAboutUpdateWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res
          .status(400)
          .json(makeErrorResponse("Invalid request"))
          .send();
      } else {
        return res.status(404).json(makeErrorResponse("About not found"));
      }
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.query;
    const idNum: number = Number(id);

    if (isNaN(idNum)) {
      return res.status(400).json(makeErrorResponse("Malformed request"));
    }

    try {
      await this.service.deleteAbout(idNum);

      return res.status(200).send();
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return res
            .status(404)
            .json(makeErrorResponse(e.meta!.cause as string));
        }
      } else {
        return res.status(500).send();
      }
    }
  }
}
