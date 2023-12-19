import { IVenueRepository } from ".";
import {
  OpeningHourUpdateRequest,
  VenueShowDBResponse,
  VenueUpdateRequest,
  VenueUpdateWebResponse,
  makeVenueUpdateWebResponse,
} from "../../controllers/feature1/models";

export interface IVenueService {
  updateVenue(
    businessId: number,
    data: VenueUpdateRequest,
  ): Promise<VenueUpdateWebResponse>;

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
  ): Promise<VenueUpdateWebResponse> {
    const result = await this.repository.updateVenueByBusinessId(
      businessId,
      data,
    );

    return makeVenueUpdateWebResponse(result);
  }

  async updateOpeningHours(businessId: number, data: OpeningHourUpdateRequest) {
    await this.repository.updateOpeningHours(businessId, data);
  }
}

export default VenueService;
