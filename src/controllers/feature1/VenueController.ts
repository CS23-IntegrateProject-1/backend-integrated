import { Request, Response } from "express";
import { compose, identity, path } from "ramda";
import { z } from "zod";

import {
  VenueService,
  IVenueService,
  VenueRepository,
} from "../../services/feature1";
import {
  CreditCardCreateRequest,
  makeCreditCardCreateResponse,
  makeErrorResponse,
  makeVenueShowWebResponse,
} from "./models";

export interface IVenueController {
  update: (req: Request, res: Response) => unknown;
  show: (req: Request, res: Response) => unknown;
  updateOpeningHours: (req: Request, res: Response) => unknown;
  updatePromptPay: (req: Request, res: Response) => unknown;

  createCreditCard: (req: Request, res: Response) => unknown;
  showCreditCard: (req: Request, res: Response) => unknown;
  updateCeditCard: (req: Request, res: Response) => unknown;
  indexCreditCard: (req: Request, res: Response) => unknown;
  deleteCreditCard: (req: Request, res: Response) => unknown;
}

const VenueUpdatePayload = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  category: z.enum(["club", "bar", "restaurant"]),
  capacity: z.number().positive(),
  website: z.string().url(),
});

const daysEnum = z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

type DayToString = { [K in z.infer<typeof daysEnum>]: string };

const OpeningHourPayload: z.ZodType<DayToString> = z.object({
  ...Object.keys(daysEnum.enum).reduce(
    (obj, key) => ({
      ...obj,
      [key]: z.object({ open: z.string(), close: z.string() }),
    }),
    {},
  ),
}) as z.ZodTypeAny;

const PromptPayPayload = z.object({
  promptpay_number: z.number(),
});

const getBusinessId = compose(Number, path(["params", "businessId"]));

const CreateCreditCardPayload = z.object({
  card_number: z.string(),
  card_holder_name: z.string(),
  country: z.string(),
  bank: z.string(),
  cvc: z.number(),
  expiration_date: z.string().datetime(),
});

class VenueController implements IVenueController {
  private service: IVenueService = new VenueService(new VenueRepository());

  async createCreditCard(req: Request, res: Response) {
    const businessId = getBusinessId(req);

    const result = await CreateCreditCardPayload.safeParseAsync(req.body);

    if (!result.success) {
      return res.status(400).json(makeErrorResponse("Invalid request"));
    }

    const request: CreditCardCreateRequest = {
      ...result.data,
      expiration_date: new Date(result.data.expiration_date),
    };

    try {
      const response = await this.service.createCreditCard(businessId, request);

      return res.json(makeCreditCardCreateResponse(response));
    } catch (e) {
      return res.status(500).json(makeErrorResponse("Internal server error"));
    }
  }

  async showCreditCard(req: Request, res: Response) {
    identity(req);
    identity(res);
    throw new Error("Unimplemented");
  }

  async updateCeditCard(req: Request, res: Response) {
    identity(req);
    identity(res);
    throw new Error("Unimplemented");
  }

  async indexCreditCard(req: Request, res: Response) {
    identity(req);
    identity(res);
    throw new Error("Unimplemented");
  }

  async deleteCreditCard(req: Request, res: Response) {
    identity(req);
    identity(res);
    throw new Error("Unimplemented");
  }

  async updatePromptPay(req: Request, res: Response) {
    const businessId = getBusinessId(req);
    const promptPay = req.body;
    const result = await PromptPayPayload.safeParseAsync(promptPay);

    if (!result.success) {
      return res.status(400).json(makeErrorResponse("Invalid request"));
    }

    try {
      await this.service.updatePromptPay(
        businessId,
        promptPay.promptpay_number,
      );

      return res.status(200).send();
    } catch (e) {
      return res.status(500).json(makeErrorResponse("Internal Server Error"));
    }
  }

  async updateOpeningHours(req: Request, res: Response) {
    const businessId = getBusinessId(req);
    const openingHours = req.body;
    const result = await OpeningHourPayload.safeParseAsync(openingHours);

    if (!result.success) {
      return res.status(400).json(makeErrorResponse("Invalid request"));
    }

    try {
      await this.service.updateOpeningHours(businessId, openingHours);

      return res.status(200).send();
    } catch (e) {
      return res.status(500).json(makeErrorResponse("Internal Server Error"));
    }
  }

  async show(req: Request, res: Response) {
    const businessId = getBusinessId(req);

    try {
      const response = await this.service.getVenue(businessId);

      const webResponse = makeVenueShowWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res.status(500).json(makeErrorResponse("Internal server error"));
    }
  }

  async update(req: Request, res: Response) {
    const businessId = getBusinessId(req);
    const venue = await VenueUpdatePayload.safeParseAsync(req.body);

    if (!venue.success) {
      return res.status(400).json(makeErrorResponse("Invalid request"));
    }

    try {
      const response = await this.service.updateVenue(businessId, venue.data);

      return res.json(response);
    } catch (e) {
      return res.status(500).json(makeErrorResponse("Internal Server Error"));
    }
  }
}

export default VenueController;
