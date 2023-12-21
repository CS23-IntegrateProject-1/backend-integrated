import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { getUserId } from ".";
import {
  IPromptPayService,
  PromptPayRepository,
  PromptPayService,
} from "../../services/feature1";
import { makeErrorResponse, makePromptPayUpdateWebResponse } from "./models";

interface IPromptPayController {
  show(req: Request, res: Response): unknown;
  update(req: Request, res: Response): unknown;
}

const PromptPayPayload = z.object({
  promptpay_number: z.number(),
  phone_number: z.string(),
});

export default class PromptPayController implements IPromptPayController {
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
    const promptPayPayload = await PromptPayPayload.safeParseAsync(req.body);

    if (!promptPayPayload.success) {
      return res.status(400).json(makeErrorResponse("Invalid request")).send();
    }

    try {
      const response = await this.service.updatePromptPayOfUser(
        getUserId(req),
        promptPayPayload.data.promptpay_number,
        promptPayPayload.data.phone_number,
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
