import { Request, Response } from "express";
import { makeErrorResponse } from "./models/payment_method.model";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import PromptPayRepository from "../../services/feature1/promptpay.repository";
import PromptPayService, {
  IPromptPayService,
} from "../../services/feature1/promptpay.service";
import { makePromptPayUpdateWebResponse } from "./models/promptpay.model";

interface IPromptPayController {
  show(req: Request, res: Response): unknown;
  update(req: Request, res: Response): unknown;
}

export class PromptPayController implements IPromptPayController {
  private service: IPromptPayService = new PromptPayService(
    new PromptPayRepository(),
  );

  async show(req: Request, res: Response) {
    try {
      const response = await this.service.showPromptPayOfUser(
        Number(req.params.userId),
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
  }

  async update(req: Request, res: Response) {
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
        Number(req.params.userId),
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
  }
}
