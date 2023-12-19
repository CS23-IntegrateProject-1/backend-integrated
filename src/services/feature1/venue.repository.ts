import { prismaClient } from "../../controllers/feature1.controller";
import {
  Day,
  OpeningHourUpdateRequest,
  VenueShowDBResponse,
} from "../../controllers/feature1/models/venue.model";

interface IVenueRepository {
  updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest);

  getVenueByBusinessId(businessId: number): Promise<VenueShowDBResponse>;
}

class VenueRepository implements IVenueRepository {
  async updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest) {
    const venueId = await this.getVenueId(businessId);

    for (const elem in data) {
      await prismaClient.opening_day.updateMany({
        where: {
          venueId,
          day: elem as Day,
        },
        data: {
          opening_hours: `0001-01-01T${data[elem].open}Z`,
          closing_hours: `0001-01-01T${data[elem].close}Z`,
        },
      });
    }
  }

  async getVenueByBusinessId(businessId: number): Promise<VenueShowDBResponse> {
    const venueId = await this.getVenueId(businessId);

    const result = await prismaClient.venue.findFirst({
      where: {
        venueId,
      },
      include: {
        Location: {
          select: {
            address: true,
          },
        },
      },
    });

    return result as VenueShowDBResponse;
  }

  async getVenueId(businessId: number): Promise<number> {
    const result = await prismaClient.property.findFirst({
      where: {
        businessId,
      },
    });

    if (result === null) {
      throw new Error("Venue not found");
    } else {
      return result.venueId;
    }
  }
}

export default VenueRepository;
