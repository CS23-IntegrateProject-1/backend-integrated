import { Complain_ticket } from "@prisma/client";

export type ComplaintTicket = {
  ticket_id: number;
  user_id: number;
  topic: string;
  complaint: string;
  status: string;
  date: Date;
  time: Date;
};

export const makeComplaintTicketResponse = (
  data: Complain_ticket,
): ComplaintTicket => ({
  ticket_id: data.ComplainTicketId,
  date: data.date,
  topic: data.topic,
  complaint: data.complaint,
  user_id: data.userId,
  status: data.status,
  time: data.time,
});
