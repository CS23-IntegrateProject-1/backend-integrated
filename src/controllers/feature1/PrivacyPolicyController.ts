import { Response, Request } from "express";

import PrivacyPolicyRepository from "../../services/feature1/privacy_policy.repository";
import PrivacyPolicyService, {
  IPrivacyPolicyService,
} from "../../services/feature1/privacy_policy.service";
import {
  makePrivacyPolicyStoreWebResponse,
  makePrivacyPolicyUpdateWebResponse,
  makePrivacyPolicyWebResponse,
} from "./models/privacy_policy.model";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { makeErrorResponse } from "./models/payment_method.model";

interface IPrivacyPolicyController {
  store: (req: Request, res: Response) => unknown;
  show: (req: Request, res: Response) => unknown;
  update: (req: Request, res: Response) => unknown;
  destroy: (req: Request, res: Response) => unknown;
}

export class PrivacyPolicyController implements IPrivacyPolicyController {
  private service: IPrivacyPolicyService = new PrivacyPolicyService(
    new PrivacyPolicyRepository(),
  );

  async store(req: Request, res: Response) {
    const { privacy_consent: privacyConsent, cookie_consent: cookieConsent } =
      req.body;

    if (
      typeof privacyConsent !== "boolean" ||
      typeof cookieConsent !== "boolean"
    ) {
      res.status(400).json(makeErrorResponse("Malformed request"));
    }

    try {
      const response = await this.service.storePrivacyPolicy(
        Number(req.params.userId),
        privacyConsent,
        cookieConsent,
      );

      const webResponse = makePrivacyPolicyStoreWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).send();
      } else if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res
            .status(409)
            .json(
              makeErrorResponse("Privacy policy already exists for this user"),
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
      const response = await this.service.getPrivacyPolicyOfUser(
        Number(req.params.userId),
      );

      const webResponse = makePrivacyPolicyWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res
        .status(404)
        .json(makeErrorResponse("User or Privacy Policy not found"));
    }
  }

  async update(req: Request, res: Response) {
    const { privacy_consent: privacyConsent, cookie_consent: cookieConsent } =
      req.body;

    if (
      typeof privacyConsent !== "boolean" ||
      typeof cookieConsent !== "boolean"
    ) {
      res.status(400).json(makeErrorResponse("Malformed request"));
    }

    try {
      const response = await this.service.updatePrivacyPolicyOfUser(
        Number(req.params.userId),
        privacyConsent,
        cookieConsent,
      );

      const webResponse = makePrivacyPolicyUpdateWebResponse(response);

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
          .json(makeErrorResponse("User or Privacy Policy not found"));
      }
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      await this.service.deletePrivacyPolicyOfUser(Number(req.params.userId));

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
