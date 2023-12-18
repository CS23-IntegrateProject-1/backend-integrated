export type Method = "Cash" | "Promptpay" | "Mobilebanking";

type ErrorResponse = {
  message: string;
};

type PaymentMethodShowWebResponse = {
  user_id: number;
  method: Method;
};

export type PaymentMethodShowDBResponse = {
  userId: number;
  method: Method;
};

export type PaymentMethodUpdateDBResponse = PaymentMethodShowDBResponse;

export type PaymentMethodUpdateWebResponse = PaymentMethodShowWebResponse;

export type PaymentMethodStoreWebResponse = PaymentMethodShowWebResponse;

export type PaymentMethodStoreDBResponse = PaymentMethodShowDBResponse;

export function makePaymentMethodWebResponse(
  data: PaymentMethodShowDBResponse,
): PaymentMethodShowWebResponse {
  return {
    user_id: data.userId,
    method: data.method,
  };
}

export function makePaymentMethodUpdateWebResponse(
  data: PaymentMethodUpdateDBResponse,
): PaymentMethodUpdateWebResponse {
  return {
    user_id: data.userId,
    method: data.method,
  };
}

export function makePaymentMethodStoreWebResponse(
  data: PaymentMethodStoreDBResponse,
): PaymentMethodStoreWebResponse {
  return {
    user_id: data.userId,
    method: data.method,
  };
}

export function makeErrorResponse(message: string): ErrorResponse {
  return {
    message,
  };
}
