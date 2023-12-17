import {
  Method,
  PaymentMethodShowDBResponse,
  PaymentMethodStoreDBResponse,
  PaymentMethodUpdateDBResponse,
} from "../../controllers/feature1/models/payment_method.model";
import { IPaymentMethodRepository } from "./payment_method.repository";

export interface IPaymentMethodService {
  getPaymentMethodOfUser(userId: number): Promise<PaymentMethodShowDBResponse>;

  updatePaymentMethodOfUser(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodUpdateDBResponse>;

  storePaymentMethod(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodStoreDBResponse>;

  deletePaymentMethodOfUser(userId: number): Promise<void>;
}

export default class PaymentMethodService implements IPaymentMethodService {
  constructor(readonly repository: IPaymentMethodRepository) {}

  async getPaymentMethodOfUser(
    userId: number,
  ): Promise<PaymentMethodShowDBResponse> {
    return this.repository.getPaymentMethodByUserId(userId);
  }

  async updatePaymentMethodOfUser(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodShowDBResponse> {
    return await this.repository.updatePaymentMethodByUserId(userId, method);
  }

  async storePaymentMethod(
    userId: number,
    method: Method,
  ): Promise<PaymentMethodStoreDBResponse> {
    return await this.repository.storePaymentMethod(userId, method);
  }

  async deletePaymentMethodOfUser(userId: number): Promise<void> {
    return await this.repository.deletePaymentMethodByUserId(userId);
  }
}
