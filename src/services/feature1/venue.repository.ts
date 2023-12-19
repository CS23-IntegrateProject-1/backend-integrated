import { prismaClient } from "../../controllers/feature1.controller";
import {
  Day,
  OpeningHourUpdateRequest,
  VenueShowDBResponse,
  VenueUpdateDBResponse,
  VenueUpdateRequest,
} from "../../controllers/feature1/models";

export interface IVenueRepository {
  updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest);

  getVenueByBusinessId(businessId: number): Promise<VenueShowDBResponse>;

  updateVenueByBusinessId(businessId: number, data: VenueUpdateRequest);
}

function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter((x) => !b.has(x)));
}

class VenueRepository implements IVenueRepository {
  async getOpeningHoursByVenueId(venueId: number) {
    return prismaClient.opening_day.findMany({
      where: {
        venueId,
      },
    });
  }

  async updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest) {
    const venueId = await this.getVenueId(businessId);
    const openingHours = await this.getOpeningHoursByVenueId(venueId);

    const allDays = new Set([
      "Mon",
      "Tue",
      "Wed",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]);
    const existingDays = new Set();

    for (let i = 0; i < openingHours.length; ++i) {
      existingDays.add(openingHours[i].day);
    }

    const daysToBeCreated = difference(allDays, existingDays);

    Promise.all([
      ...Array.from(existingDays).map(async (day) => {
        return await prismaClient.opening_day.updateMany({
          where: {
            venueId,
            day: day as Day,
          },
          data: {
            opening_hours: `0001-01-01T${data[day as Day].open}Z`,
            closing_hours: `0001-01-01T${data[day as Day].close}Z`,
          },
        });
      }),
      ...Array.from(daysToBeCreated).map(async (day) => {
        return await prismaClient.opening_day.create({
          data: {
            opening_hours: `0001-01-01T${data[day as Day].open}Z`,
            closing_hours: `0001-01-01T${data[day as Day].close}Z`,
            venueId,
            day: day as Day,
          },
        });
      }),
    ]);
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
