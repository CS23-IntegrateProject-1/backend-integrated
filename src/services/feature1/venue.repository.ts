import { Venue_credit_card } from "@prisma/client";
import { prismaClient } from "../../controllers/feature1.controller";
import {
  CreditCardCreateRequest,
  Day,
  OpeningHourUpdateRequest,
  VenueShowDBResponse,
  VenueUpdateDBResponse,
  VenueUpdateRequest,
} from "../../controllers/feature1/models";
import { identity } from "ramda";

export interface IVenueRepository {
  updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest);

  getVenueByBusinessId(businessId: number): Promise<VenueShowDBResponse>;

  updateVenueByBusinessId(businessId: number, data: VenueUpdateRequest);

  updatePromptPayByBusinessId(businessId: number, promptPayNumber: number);

  createCreditCard(
    businessId: number,
    data: CreditCardCreateRequest,
  ): Promise<Venue_credit_card>;

  getCreditCardById(
    businessId: number,
    creditCardId: number,
  ): Promise<Venue_credit_card | null>;

  listCreditCardsByBusinessId(
    businessId: number,
  ): Promise<Array<Venue_credit_card>>;
}

function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter((x) => !b.has(x)));
}

class VenueRepository implements IVenueRepository {
  async listCreditCardsByBusinessId(
    businessId,
  ): Promise<Array<Venue_credit_card>> {
    const venueId = await this.getVenueId(businessId);

    return prismaClient.venue_credit_card.findMany({
      where: {
        venueId,
      },
    });
  }

  async getCreditCardById(
    businessId: number,
    creditCardId: number,
  ): Promise<Venue_credit_card | null> {
    identity(businessId);
    return prismaClient.venue_credit_card.findFirst({
      where: {
        creditCardId,
      },
    });
  }

  async createCreditCard(
    businessId: number,
    data: CreditCardCreateRequest,
  ): Promise<Venue_credit_card> {
    const venueId = await this.getVenueId(businessId);

    return prismaClient.venue_credit_card.create({
      data: {
        card_no: data.card_number,
        name: data.card_holder_name,
        country: data.country,
        bank: data.bank,
        cvc: data.cvc,
        exp: data.expiration_date,
        venueId,
      },
    });
  }

  async updatePromptPayByBusinessId(
    businessId: number,
    promptPayNumber: number,
  ) {
    const venueId = await this.getVenueId(businessId);

    return await prismaClient.venue_promptpay.upsert({
      where: {
        venueId,
      },
      create: {
        venueId,
        promptpay_no: promptPayNumber,
      },
      update: {
        promptpay_no: promptPayNumber,
      },
    });
  }

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
