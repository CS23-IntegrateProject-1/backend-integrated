import { prismaClient } from "../../controllers/feature1";
import { ComplaintTicketWithResponses } from "../../controllers/feature1/models";
import { NotFoundError } from "../../controllers/feature1/models/errors";

export interface IHelpDeskRepository {
  createTicket(
    userId: number,
    topic: string,
    complaint: string,
  ): Promise<ComplaintTicketWithResponses>;

  getTicketById(
    userId: number,
    ticketId: number,
  ): Promise<ComplaintTicketWithResponses>;
}

export default class HelpDeskRepository implements IHelpDeskRepository {
  async getTicketById(
    userId: number,
    ticketId: number,
  ): Promise<ComplaintTicketWithResponses> {
    const result = await prismaClient.complain_ticket.findFirst({
      where: {
        userId,
        ComplainTicketId: ticketId,
      },
      include: {
        Ticket_responses: true,
      },
    });

    if (!result) throw new NotFoundError("Ticket Not Found");

    return result;
  }

  async createTicket(
    userId: number,
    topic: string,
    complaint: string,
  ): Promise<ComplaintTicketWithResponses> {
    return prismaClient.complain_ticket.create({
      data: {
        userId,
        topic,
        complaint,
        status: "Pending",
      },
      include: {
        Ticket_responses: true,
      },
    });
  }
}
