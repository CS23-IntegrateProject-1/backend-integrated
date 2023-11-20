import { Response, Request } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import PaymentMethodRepository from "../../services/feature1/payment_method.repository";
import PaymentMethodService, {
  IPaymentMethodService,
} from "../../services/feature1/payment_method.service";
import {
  makeErrorResponse,
  makePaymentMethodStoreWebResponse,
  makePaymentMethodUpdateWebResponse,
  makePaymentMethodWebResponse,
} from "./models/payment_method.model";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { extractToken } from "./utils";

interface IPaymentMethodController {
  store: (req: Request, res: Response) => unknown;
  show: (req: Request, res: Response) => unknown;
  update: (req: Request, res: Response) => unknown;
  destroy: (req: Request, res: Response) => unknown;
}

export class PaymentMethodController implements IPaymentMethodController {
  private service: IPaymentMethodService = new PaymentMethodService(
    new PaymentMethodRepository(),
  );

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

      try {
        const { method } = req.body;

        const response = await this.service.storePaymentMethod(userId, method);

        const webResponse = makePaymentMethodStoreWebResponse(response);

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
                  "Payment method already exists for this user",
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
        const response = await this.service.getPaymentMethodOfUser(userId);

        const webResponse = makePaymentMethodWebResponse(response);

        return res.json(webResponse);
      } catch (e) {
        return res
          .status(404)
          .json(makeErrorResponse("User or payment method not found"));
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

      const { method } = req.body;

      try {
        const response = await this.service.updatePaymentMethodOfUser(
          userId,
          method,
        );

        const webResponse = makePaymentMethodUpdateWebResponse(response);

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
            .json(makeErrorResponse("User or payment method not found"));
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
        await this.service.deletePaymentMethodOfUser(userId);

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
