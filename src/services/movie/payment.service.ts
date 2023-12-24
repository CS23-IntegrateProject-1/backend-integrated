import { PrismaClient } from "@prisma/client";
import { MajorAxios } from "../../configs/MajorAxiosInstance";

class paymentService {
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async waitForPayment(harmoniLogs: number[]) {
    try {
      const prisma = new PrismaClient();
      await this.delay(1 * 60 * 1000);
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
          MajorAxios.post("api/reservation/delete", {
            showId,
            seatId,
          });
        }
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async updatePaymentStatusToSuccess(reservationId: number) {
    try {
      const prisma = new PrismaClient();
      await prisma.payments.update({
        where: {
          reservationId: reservationId,
        },
        data: {
          payment_status: "Success",
        },
      });
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default new paymentService();
