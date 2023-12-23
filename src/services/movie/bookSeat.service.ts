import { MajorAxios as Axios } from "../../configs/MajorAxiosInstance";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

class bookSeatService {
  prisma = new PrismaClient();
  async getMinorAvilableSeats(showId: number, seatId: number) {
    return await Axios.post("/api/reservation/check", {
      showId: showId,
      seatId: seatId,
    });
  }

  async createMinorReservation(seatIds: number[], showId: number) {
    const minorReservationIds: number[] = [];
    for (const seatId of seatIds) {
      const response = await Axios.post("/api/reservation/create", {
        showId: showId,
        seatId: seatId,
      });
      minorReservationIds.push(response.data.reservationId);
    }
    return minorReservationIds;
  }

  createCookie(reservationIds: number[], userId: number) {
    const secretKey = process.env.JWT_SECRET as string;
    return jwt.sign({ reservationIds, userId }, secretKey, {
      expiresIn: 5 * 60,
    });
  }

  async deleteLog(id: number) {
    const response = await this.prisma.reservation_logs.delete({
      where: {
        reservationId: id,
      },
    });
    return response;
  }
}

export default new bookSeatService();
