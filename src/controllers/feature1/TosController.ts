import { Response, Request } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

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

interface ITosController {
  store: (req: Request, res: Response) => unknown;
  show: (req: Request, res: Response) => unknown;
  update: (req: Request, res: Response) => unknown;
  destroy: (req: Request, res: Response) => unknown;
}

function extractToken({ headers }: Request): string {
  let { cookie: token } = headers;

  if (!token) {
    throw new Error("Invalid token");
  }

  return token.replace("authToken=", "");
}

export class TosController implements ITosController {
  private service: ITosService = new TosService(new TosRepository());

  async store(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

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
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }
    }
  }

  async show(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

      try {
        const response = await this.service.getTosOfUser(userId);

        const webResponse = makeTosWebResponse(response);

        return res.json(webResponse);
      } catch (e) {
        return res
          .status(404)
          .json(makeErrorResponse("User or Term of services not found"));
      }
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }
    }
  }

  async update(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

      const { consent } = req.body;

      if (typeof consent !== "boolean") {
        res.status(400).json(makeErrorResponse("Malformed request"));
      }

      try {
        const response = await this.service.updateTosOfUser(userId, consent);

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
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }
    }
  }

  async destroy(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

      try {
        await this.service.deleteTosOfUser(userId);

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
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }
    }
  }
}
