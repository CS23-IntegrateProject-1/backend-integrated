import { identity } from "ramda";
import {
  OpeningHourUpdateRequest,
  VenueShowDBResponse,
  VenueUpdateDBResponse,
  VenueUpdateRequest,
} from "../../controllers/feature1/models/venue.model";
import IVenueRepository from "./venue.repository";

export interface IVenueService {
  updateVenue(
    businessId: number,
    data: VenueUpdateRequest,
  ): Promise<VenueUpdateDBResponse>;

  getVenue(businessId: number): Promise<VenueShowDBResponse>;

  updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest);
}

class VenueService implements IVenueService {
  constructor(readonly repository: IVenueRepository) {}

  async getVenue(businessId: number): Promise<VenueShowDBResponse> {
    return this.repository.getVenueByBusinessId(businessId);
  }

  async updateVenue(
    businessId: number,
    data: VenueUpdateRequest,
  ): Promise<VenueUpdateDBResponse> {
    identity(businessId);
    identity(data);

    const resp: VenueUpdateDBResponse = {
      capacity: 0,
      category: 'Bar',
      description: '',
      name: 'Foo',
      venueId: 3,
      website_url: 'https://www.google.com/',
      Location: {
        address: '666 maybe, null st'
      }
    }

    return resp;
  }

  async updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest) {
    await this.repository.updateOpeningHours(businessId, data);
  }
}

export default VenueService;
