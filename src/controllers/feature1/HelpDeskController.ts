import { Request, Response } from "express";
import {
  HelpDeskRepository,
  HelpDeskService,
  IHelpDeskService,
} from "../../services/feature1";
import { getUserId } from ".";
import { z } from "zod";
import { NotFoundError } from "./models";

interface IHelpDeskConroller {
  create(req: Request, res: Response): unknown;
  show(req: Request, res: Response): unknown;
  index(req: Request, res: Response): unknown;
}

const TicketCreatePayload = z.object({
  topic: z.string(),
  complaint: z.string(),
});

export class HelpDeskController implements IHelpDeskConroller {
  private service: IHelpDeskService = new HelpDeskService(
    new HelpDeskRepository(),
  );

  async index(req: Request, res: Response) {
    const userId = getUserId(req);

    try {
      const tickets = await this.service.listTicketsByUserId(userId);

      return res.json(tickets);
    } catch (e) {
      return res.status(500).json({ message: "Unknown Error Encountered" });
    }
  }

  async show(req: Request, res: Response) {
    const userId = getUserId(req);
    const ticketId = Number(req.params.id);

    if (!ticketId) return res.status(400).json({ message: "Invalid Request" });

    try {
      const ticket = await this.service.getTicketById(userId, ticketId);

      return res.json(ticket);
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(404).json({ message: "Ticket Not Found" });
      }

      return res.status(500).json({ message: "Unknown Error Encountered" });
    }
  }

  async create(req: Request, res: Response) {
    const userId = getUserId(req);

    const result = await TicketCreatePayload.safeParseAsync(req.body);

    if (!result.success)
      return res.status(400).json({ message: "Invalid Request" });

    try {
      const ticket = await this.service.createTicket(
        userId,
        result.data.topic,
        result.data.complaint,
      );

      return res.json(ticket);
    } catch (e) {
      return res.status(500).json({ message: "Unknown Error Encountered" });
    }
  }
}
