import { Response, Request } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

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

function extractToken({ headers }: Request): string {
  let { cookie: token } = headers;

  if (!token) {
    throw new Error("Invalid token");
  }

  return token.replace("authToken=", "");
}

export class PrivacyPolicyController implements IPrivacyPolicyController {
  private service: IPrivacyPolicyService = new PrivacyPolicyService(
    new PrivacyPolicyRepository(),
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
          userId,
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
                makeErrorResponse(
                  "Privacy policy already exists for this user",
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
        const response = await this.service.getPrivacyPolicyOfUser(userId);

        const webResponse = makePrivacyPolicyWebResponse(response);

        return res.json(webResponse);
      } catch (e) {
        return res
          .status(404)
          .json(makeErrorResponse("User or Privacy Policy not found"));
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
          userId,
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
        await this.service.deletePrivacyPolicyOfUser(userId);

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
