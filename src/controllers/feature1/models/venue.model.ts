import { Opening_day, Venue_credit_card } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { format } from "date-fns";

type VenueCateogry = "club" | "bar" | "restaurant";

export type VenueUpdateDBResponse = {
  capacity: number;
  category: string;
  description: string;
  name: string;
  venueId: number;
  website_url: string;
  venue_picture: string | null;
  Location: {
    address: string;
  };
};

export type VenueUpdateRequest = {
  name: string;
  description: string;
  address: string;
  category: VenueCateogry;
  capacity: number;
  website: string;
};

export type VenueUpdateWebResponse = {
  name: string;
  description: string;
  address: string;
  category: VenueCateogry;
  capacity: number;
  website: string;
  avatar: string | null;
};

export function makeVenueUpdateWebResponse(
  data: VenueUpdateDBResponse,
): VenueUpdateWebResponse {
  return {
    name: data.name,
    description: data.description,
    address: data.Location.address,
    category: data.category as VenueCateogry,
    capacity: data.capacity,
    website: data.website_url,
    avatar: data.venue_picture,
  };
}

export const makeVenueShowWebResponse = makeVenueUpdateWebResponse;

export type VenueShowDBResponse = VenueUpdateDBResponse;

export type VenueShowWebResponse = VenueUpdateWebResponse;

export type OpeningHourUpdateDBResponse = unknown;

export type OpeningHour = {
  open: string;
  close: string;
};

export enum Day {
  "Mon" = "Mon",
  "Tue" = "Tue",
  "Wed" = "Wed",
  "Thu" = "Thu",
  "Fri" = "Fri",
  "Sat" = "Sat",
  "Sun" = "Sun",
}

export type OpeningHourUpdateRequest = {
  [day in Day]: OpeningHour;
};

export type OpeningEntry = OpeningHourUpdateRequest;

export type PriceRangeDBResponse = {
  _max: {
    price: Decimal | null;
  };
  _min: {
    price: Decimal | null;
  };
};

export type PriceRange = {
  max: Decimal | number;
  min: Decimal | number;
};

export const makePriceRange = (data: PriceRangeDBResponse): PriceRange => {
  return {
    max: data._max.price ?? 0,
    min: data._min.price ?? 0,
  };
};

export const makeOpeningEntry = (data: Array<Opening_day>): OpeningEntry => {
  const result = data
    .map((item: Opening_day) => ({
      [item.day as Day]: {
        open: format(item.opening_hours, "HH:mm:ss"),
        close: format(item.closing_hours, "HH:mm:ss"),
      },
    }))
    .reduce((acc, item) => {
      const [key, value] = Object.entries(item)[0];
      acc[key] = value;
      return acc;
    }, {});

  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((day) => {
    if (!result[day]) {
      result[day] = {
        open: "00:00:00",
        close: "00:00:00",
      };
    }
  });

  return result as OpeningEntry;
};

export type CreditCardCreateRequest = {
  card_number: string;
  card_holder_name: string;
  country: string;
  bank: string;
  cvc: number;
  expiration_date: Date;
};

export type CreditCardCreateResponse = CreditCardCreateRequest & {
  card_id: number;
};

export const makeCreditCardCreateResponse = (
  data: Venue_credit_card,
): CreditCardCreateResponse => ({
  card_number: data.card_no,
  card_holder_name: data.name,
  country: data.country,
  bank: data.bank,
  cvc: data.cvc,
  expiration_date: data.exp,
  card_id: data.creditCardId,
});

export const makeCreditCardListResponse = (data: Array<Venue_credit_card>) =>
  data.map(makeCreditCardCreateResponse);

export type VenuePromptPayShowDBResponse = {
  promptpay_no: number;
  Venue: {
    Property: Array<{
      Business_user: {
        phone_num: string | null;
      };
    }>;
  };
};

type VenuePromptPayShowWebResponse = {
  prompt_pay_number: number;
  business_phone_number: string;
};

export const makeVenuePromptPayShowWebResponse = (
  data: VenuePromptPayShowDBResponse,
): VenuePromptPayShowWebResponse => {
  let phone_number = "";

  if (!(data.Venue.Property.length === 0)) {
    phone_number = data.Venue.Property[0].Business_user.phone_num ?? "";
  }

  return {
    prompt_pay_number: data.promptpay_no,
    business_phone_number: phone_number,
  };
};
