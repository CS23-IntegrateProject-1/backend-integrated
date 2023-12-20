import { Complain_ticket } from "@prisma/client";
import { prismaClient } from "../../controllers/feature1";
import { NotFoundError } from "../../controllers/feature1/models/errors";

export interface IHelpDeskRepository {
  createTicket(
    userId: number,
    topic: string,
    complaint: string,
  ): Promise<Complain_ticket>;

  getTicketById(userId: number, ticketId: number): Promise<Complain_ticket>;
}

export default class HelpDeskRepository implements IHelpDeskRepository {
  async getTicketById(
    userId: number,
    ticketId: number,
  ): Promise<Complain_ticket> {
    const result = await prismaClient.complain_ticket.findFirst({
      where: {
        userId,
        ComplainTicketId: ticketId,
      },
    });

    if (!result) throw new NotFoundError("Ticket Not Found");

    return result;
  }

  async createTicket(
    userId: number,
    topic: string,
    complaint: string,
  ): Promise<Complain_ticket> {
    return prismaClient.complain_ticket.create({
      data: {
        userId,
        topic,
        complaint,
        status: "Pending",
      },
    });
  }
}
