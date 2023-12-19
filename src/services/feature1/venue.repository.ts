import { prismaClient } from "../../controllers/feature1.controller";
import {
  OpeningHourUpdateRequest,
  VenueShowDBResponse,
  VenueUpdateRequest,
  Day,
  VenueUpdateDBResponse,
} from "../../controllers/feature1/models";

export interface IVenueRepository {
  updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest);

  getVenueByBusinessId(businessId: number): Promise<VenueShowDBResponse>;

  updateVenueByBusinessId(businessId: number, data: VenueUpdateRequest);
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

  async updateVenueByBusinessId(
    businessId: number,
    data: VenueUpdateRequest,
  ): Promise<VenueUpdateDBResponse> {
    const venueId = await this.getVenueId(businessId);

    const result = await prismaClient.venue.update({
      where: {
        venueId,
      },
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        capacity: data.capacity,
        website_url: data.website,
        Location: {
          update: {
            address: data.address,
          },
        },
      },
      select: {
        name: true,
        description: true,
        category: true,
        capacity: true,
        website_url: true,
        Location: {
          select: {
            address: true,
          },
        },
      },
    });

    return result as VenueUpdateDBResponse;
  }
}

export default VenueRepository;
