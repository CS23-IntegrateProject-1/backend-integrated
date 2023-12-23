import { Response, Request } from "express";

import TosRepository from "../../services/feature1/tos.repository";
import TosService, { ITosService } from "../../services/feature1/tos.service";
import {
  makeTosStoreWebResponse,
  makeTosUpdateWebResponse,
  makeTosWebResponse,
} from "./models/tos.model";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { makeErrorResponse } from "./models/payment_method.model";
import { getUserId } from ".";

interface ITosController {
  store: (req: Request, res: Response) => unknown;
  show: (req: Request, res: Response) => unknown;
  update: (req: Request, res: Response) => unknown;
  destroy: (req: Request, res: Response) => unknown;
}

export default class TosController implements ITosController {
  private service: ITosService = new TosService(new TosRepository());

  async store(req: Request, res: Response) {
    const userId = getUserId(req);
    const { consent } = req.body;

    if (typeof consent !== "boolean") {
      res.status(400).json(makeErrorResponse("Malformed request"));
    }

    try {
      const response = await this.service.storeTos(userId, consent);

      const webResponse = makeTosStoreWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).send();
      } else if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res
            .status(409)
            .json(
              makeErrorResponse(
                "Term of services already exists for this user",
              ),
            )
            .send();
        }
      } else {
        return res.status(500).send();
      }
    }
  }

  async show(req: Request, res: Response) {
    try {
      const response = await this.service.getTosOfUser(
        Number(req.params.userId),
      );

      const webResponse = makeTosWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res
        .status(404)
        .json(makeErrorResponse("User or Term of services not found"));
    }
  }

  async update(req: Request, res: Response) {
    const { consent } = req.body;

    if (typeof consent !== "boolean") {
      res.status(400).json(makeErrorResponse("Malformed request"));
    }

    try {
      const response = await this.service.updateTosOfUser(
        Number(req.params.userId),
        consent,
      );

      const webResponse = makeTosUpdateWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res
          .status(400)
          .json(makeErrorResponse("Invalid request"))
          .send();
      } else {
        return res
          .status(404)
          .json(makeErrorResponse("User or Term of services not found"));
      }
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      await this.service.deleteTosOfUser(Number(req.params.userId));

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
