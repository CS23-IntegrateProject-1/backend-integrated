import { Request, Response } from "express";
import { makeErrorResponse } from "./models/payment_method.model";
import VenueService, {
  IVenueService,
} from "../../services/feature1/venue.service";
import VenueRepository from "../../services/feature1/venue.repository";
import { z } from "zod";
import {
  makeVenueUpdateWebResponse,
  makeVenueShowWebResponse,
} from "./models/venue.model";

export interface IVenueController {
  update: (req: Request, res: Response) => unknown;
  show: (req: Request, res: Response) => unknown;
  updateOpeningHours: (req: Request, res: Response) => unknown;
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

class VenueController implements IVenueController {
  private service: IVenueService = new VenueService(new VenueRepository());

  async updateOpeningHours(req: Request, res: Response) {
    const openingHours = req.body;

    const result = await OpeningHourPayload.safeParseAsync(openingHours);

    if (!result.success) {
      return res.status(400).json(makeErrorResponse("Invalid request"));
    }

    try {
      await this.service.updateOpeningHours(
        Number(req.params.businessId),
        openingHours,
      );

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      return res.status(500).json(makeErrorResponse("Internal Server Error"));
    }
  }

  async show(req: Request, res: Response) {
    try {
      const response = await this.service.getVenue(
        Number(req.params.businessId),
      );

      const webResponse = makeVenueShowWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res.status(500).json(makeErrorResponse("Internal server error"));
    }
  }

  async update(req: Request, res: Response) {
    const venue = req.body;

    const result = await VenueUpdatePayload.safeParseAsync(venue);

    if (!result.success) {
      return res.status(400).json(makeErrorResponse("Invalid request"));
    }

    try {
      const response = await this.service.updateVenue(
        Number(req.params.businessId),
        result.data,
      );

      const webResponse = makeVenueUpdateWebResponse(response);

      return res.json(webResponse);
    } catch (e) {
      return res.status(500).json(makeErrorResponse("Internal Server Error"));
    }
  }
}

export default VenueController;
