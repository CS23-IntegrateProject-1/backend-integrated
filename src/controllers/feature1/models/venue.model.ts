type VenueCateogry = "club" | "bar" | "restaurant";

export type VenueUpdateDBResponse = {
  capacity: number;
  category: string;
  description: string;
  name: string;
  venueId: number;
  website_url: string;
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
  };
}

export const makeVenueShowWebResponse = makeVenueUpdateWebResponse;

export type VenueShowDBResponse = VenueUpdateDBResponse;

export type VenueShowWebResponse = VenueUpdateWebResponse;

export type OpeningHourUpdateDBResponse = unknown;

type OpeningHour = {
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
