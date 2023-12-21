import { IHelpDeskRepository } from ".";
import {
  ComplaintTicket,
  makeComplaintTicketResponse,
} from "../../controllers/feature1/models";

export interface IHelpDeskService {
  createTicket(
    userId: number,
    topic: string,
    complaint: string,
  ): Promise<ComplaintTicket>;

  getTicketById(userId: number, ticketId: number): Promise<ComplaintTicket>;
}

export default class HelpDeskService implements IHelpDeskService {
  constructor(readonly repository: IHelpDeskRepository) {}

  async getTicketById(
    userId: number,
    ticketId: number,
  ): Promise<ComplaintTicket> {
    return makeComplaintTicketResponse(
      await this.repository.getTicketById(userId, ticketId),
    );
  }

  async createTicket(
    userId: number,
    topic: string,
    complaint: string,
  ): Promise<ComplaintTicket> {
    const result = await this.repository.createTicket(userId, topic, complaint);

    return makeComplaintTicketResponse(result);
  }
}
