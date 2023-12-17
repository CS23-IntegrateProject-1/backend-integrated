import {
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
    return this.repository.updateVenue(businessId, data);
  }
}

export default VenueService;
