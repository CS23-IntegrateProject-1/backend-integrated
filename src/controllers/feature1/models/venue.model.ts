type VenueCateogry = "club" | "bar" | "restaurant";

export type VenueDBResponse = {};

export type VenueUpdateDBResponse = {
  capacity: number;
  category: string;
  description: string;
  name: string;
  venueId: number;
  website_url: string;
  location: {
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
    address: data.location.address,
    category: data.category as VenueCateogry,
    capacity: data.capacity,
    website: data.website_url,
  };
}
