import { Response, Request } from "express";

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
    const userId = 1;

    const { method } = req.body;

    try {
      const response = await this.service.storePaymentMethod(userId, method);

      const webResponse = makePaymentMethodStoreWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      console.log(e);
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).send();
      } else if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res
            .status(409)
            .json(
              makeErrorResponse("Payment method already exists for this user"),
            )
            .send();
        }
      } else {
        return res.status(500).send();
      }
    }
  }

  async show(req: Request, res: Response) {
    const userId = 1;

    try {
      const response = await this.service.getPaymentMethodOfUser(userId);

      const webResponse = makePaymentMethodWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res
        .status(404)
        .json(makeErrorResponse("User or payment method not found"));
    }
  }

  async update(req: Request, res: Response) {
    const userId = 3;

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
        return res.status(400).send();
      } else {
        return res
          .status(404)
          .json(makeErrorResponse("User or payment method not found"));
      }
    }
  }

  async destroy(req: Request, res: Response) {
    const userId = 1;

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
  }
}
