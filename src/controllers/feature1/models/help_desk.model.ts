import { Prisma } from "@prisma/client";
import { isNil } from "ramda";

export type ComplaintTicketWithResponses = Prisma.Complain_ticketGetPayload<{
  include: { Ticket_responses: true };
}>;

export type ComplaintTicket = {
  ticket_id: number;
  user_id: number;
  topic: string;
  complaint: string;
  status: string;
  date: Date;
  time: Date;
  responses: Array<string | null>;
};

export const makeComplaintTicketResponse = (
  data: ComplaintTicketWithResponses,
): ComplaintTicket => {
  return {
    ticket_id: data.ComplainTicketId,
    date: data.date,
    topic: data.topic,
    complaint: data.complaint,
    user_id: data.userId,
    status: data.status,
    time: data.time,
    responses: data.Ticket_responses.map(
      (response) => response.response,
    ).filter((response) => !isNil(response)),
  };
};
