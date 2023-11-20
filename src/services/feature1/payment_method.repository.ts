import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  Method,
  PaymentMethodShowDBResponse,
  PaymentMethodStoreDBResponse,
  PaymentMethodUpdateDBResponse,
} from "../../controllers/feature1/models/payment_method.model";

export interface IPaymentMethodRepository {
  getPaymentMethodByUserId(
    userId: number,
  ): Promise<PaymentMethodShowDBResponse>;

  updatePaymentMethodByUserId(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodUpdateDBResponse>;

  storePaymentMethod(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodStoreDBResponse>;

  deletePaymentMethodByUserId(userId: number): Promise<void>;
}

export default class PaymentMethodRepository
  implements IPaymentMethodRepository
{
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getPaymentMethodByUserId(
    userId: number,
  ): Promise<PaymentMethodShowDBResponse> {
    const result = await this.prismaClient.payment_method.findFirst({
      where: {
        userId,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as PaymentMethodShowDBResponse;
    }
  }

  async updatePaymentMethodByUserId(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodUpdateDBResponse> {
    const result = await this.prismaClient.payment_method.update({
      where: {
        userId,
      },
      data: {
        method,
      },
    });

    if (result === null) {
      throw new Error("User not found");
    } else {
      return result as PaymentMethodUpdateDBResponse;
    }
  }

  async storePaymentMethod(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodStoreDBResponse> {
    const result = await this.prismaClient.payment_method.create({
      data: {
        userId,
        method,
      },
    });

    return result as PaymentMethodStoreDBResponse;
  }

  async deletePaymentMethodByUserId(userId: number): Promise<void> {
    await this.prismaClient.payment_method.delete({
      where: {
        userId,
      },
    });
  }
}
