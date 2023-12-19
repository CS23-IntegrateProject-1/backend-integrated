import { Request, Response } from "express";
import { compose, path } from "ramda";
import { z } from "zod";

import {
  VenueService,
  IVenueService,
  VenueRepository,
} from "../../services/feature1";
import { makeErrorResponse, makeVenueShowWebResponse } from "./models";

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

const getBusinessId = compose(Number, path(["params", "businessId"]));

class VenueController implements IVenueController {
  private service: IVenueService = new VenueService(new VenueRepository());

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
