import { Request, Response } from "express";
import { makeErrorResponse } from "./models/payment_method.model";
import VenueService, {
  IVenueService,
} from "../../services/feature1/venue.service";
import VenueRepository from "../../services/feature1/venue.repository";
import { z } from "zod";
import { makeVenueUpdateWebResponse } from "./models/venue.model";

export interface IVenueController {
  update: (req: Request, res: Response) => unknown;
}

const VenueUpdatePayload = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  category: z.enum(["club", "bar", "restaurant"]),
  capacity: z.number().positive(),
  website: z.string().url(),
});

class VenueController implements IVenueController {
  private service: IVenueService = new VenueService(new VenueRepository());

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
      console.log(e);
      return res.status(404).json(makeErrorResponse("Business User not found"));
    }
  }
}

export default VenueController;
