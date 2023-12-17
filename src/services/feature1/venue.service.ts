import {
  VenueUpdateDBResponse,
  VenueUpdateRequest,
} from "../../controllers/feature1/models/venue.model";
import IVenueRepository from "./venue.repository";

export interface IVenueService {
  updateVenue(
    businessId: number,
    data: VenueUpdateRequest,
  ): Promise<VenueUpdateDBResponse>;
}

class VenueService implements IVenueService {
  constructor(readonly repository: IVenueRepository) {}

  async updateVenue(
    businessId: number,
    data: VenueUpdateRequest,
  ): Promise<VenueUpdateDBResponse> {
    return this.repository.updateVenue(businessId, data);
  }
}

export default VenueService;
