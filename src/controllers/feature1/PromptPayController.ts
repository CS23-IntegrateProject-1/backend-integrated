import { Request, Response } from "express";
import { extractToken } from "./utils";
import { makeErrorResponse } from "./models/payment_method.model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import PromptPayRepository from "../../services/feature1/promptpay.repository";
import PromptPayService, {
  IPromptPayService,
} from "../../services/feature1/promptpay.service";
import { makePromptPayUpdateWebResponse } from "./models/promptpay.model";

interface IPromptPayController {
  update(req: Request, res: Response): unknown;
}

export class PromptPayController implements IPromptPayController {
  private service: IPromptPayService = new PromptPayService(
    new PromptPayRepository(),
  );

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

      const { promptpay_number, phone_number } = req.body;
      const promptPayNum = Number(promptpay_number);

      if (
        !promptpay_number ||
        isNaN(promptPayNum) ||
        typeof phone_number !== "string"
      ) {
        res
          .status(400)
          .json(
            makeErrorResponse(
              "Promptpay number or Phone number not present or invalid",
            ),
          );
      }

      try {
        const response = await this.service.updatePromptPayOfUser(
          userId,
          promptpay_number,
          phone_number,
        );

        const webResponse = makePromptPayUpdateWebResponse(response);

        return res.json(webResponse);
      } catch (e) {
        if (e instanceof PrismaClientValidationError) {
          return res
            .status(400)
            .json(makeErrorResponse("Invalid request"))
            .send();
        } else {
          return res.status(404).json(makeErrorResponse("User not found"));
        }
      }
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }
    }
  }
}
