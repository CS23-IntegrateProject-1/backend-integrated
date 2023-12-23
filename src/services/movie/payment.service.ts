import { PrismaClient } from "@prisma/client";

class paymentService {
    
    async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async waitForPayment(harmoniLogs: number[]){
        const prisma = new PrismaClient();
        await this.delay(0.5*60*1000)
        for(const reservationId of harmoniLogs){
            const response: any[] = await prisma.payments.findMany({
                where: {
                    reservationId: reservationId,
                },
        });
        if(response[0].payment_status != "Success"){
            await prisma.payments.delete({
              where: {
                reservationId: reservationId,
              },
            });
            await prisma.reservation_logs.delete({
                where: {
                    reservationId: reservationId,
                },
            });
            console.log("deleted: " + reservationId);
            
        }
    }
}
}

export default new paymentService();