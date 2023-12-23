import { PrismaClient } from "@prisma/client";
import { MajorAxios } from "../../configs/MajorAxiosInstance";

class paymentService {
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async waitForPayment(harmoniLogs: number[]) {
    const prisma = new PrismaClient();
    await this.delay(0.5 * 60 * 1000);
    for (const reservationId of harmoniLogs) {
      const response: any[] = await prisma.payments.findMany({
        where: {
          reservationId: reservationId,
        },
      });
      if (response[0].payment_status != "Success") {
        await prisma.payments.delete({
          where: {
            reservationId: reservationId,
          },
        });
        const harmoniResponse = await prisma.reservation_logs.delete({
          where: {
            reservationId: reservationId,
          },
        });
        console.log("deleted: " + reservationId);

        const showId = harmoniResponse.showId;
        const seatId = harmoniResponse.seatId;
        MajorAxios.post("api/reservaion/delete", {
          showId,
          seatId,
        });
      }
    }
  }
}

export default new paymentService();
