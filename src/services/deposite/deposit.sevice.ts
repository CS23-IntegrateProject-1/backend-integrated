import { Stripe } from "stripe";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIP_KEY ?? "");
const feature8Client = new PrismaClient();

export const createDepositSession = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.body;
        const priceResponse = await getDepositDynamicPriceId(req, res);
  
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: priceResponse,
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.CLIENT_URL}/deposit-success`,
          cancel_url: `${process.env.CLIENT_URL}/deposit-cancel`,
        } as any);
  
        await feature8Client.reservation.update({
          where: {
            reservationId: reservationId,
          },
          data: {
            isPaidDeposit: "Completed",
          },
        });
  
        return res.status(200).json({ url: session.url });
    } catch (error) {
      return res.json(error);
    }
  };
  
  
  //For Deposit
  const getDepositDynamicPriceId = async (req: Request, res: Response) => {
    const product = await stripe.products.create({
      name: "Checkout",
      description: "Pay for checkout",
    });
    try {
      const { reservationId } = req.body;
  
      const depositQueryResult = await feature8Client.deposit.findFirst({
        where: {
          Reservation: {
            some: {
              reservationId: reservationId,
            },
          },
        },
        select: {
          depositId: true,
          deposit_amount: true,
        },
      });
      const deposit_amount = depositQueryResult?.deposit_amount;
      
      const totalAmount2: any = deposit_amount!.toFixed(2);
      
      const movedDecimalNumber = totalAmount2 * 100;
      console.log(movedDecimalNumber);
      const strPrice = movedDecimalNumber.toString();
      console.log(strPrice);
      const price = await stripe.prices.create({
        unit_amount_decimal: strPrice,
        currency: "thb",
        product: product.id,
      });
      return price.id;
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  };