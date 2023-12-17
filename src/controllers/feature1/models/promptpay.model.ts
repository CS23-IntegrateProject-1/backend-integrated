export type PromptPayUpdateWebResponse = {
  user_id: number;
  username: string;
  promptpay_number: number;
  phone_number: string;
};

export type PromptPayUpdateDBResponse = {
  userId: number;
  username: string;
  prompt_pay: number;
  phone: string;
};

export function makePromptPayUpdateWebResponse(
  data: PromptPayUpdateDBResponse,
): PromptPayUpdateWebResponse {
  return {
    user_id: data.userId,
    username: data.username,
    promptpay_number: data.prompt_pay,
    phone_number: data.phone,
  };
}

export type PromptPayShowWebResponse = {
  user_id: number;
  username: string;
  promptpay_number: number;
  phone_number: string;
};

export type PromptPayShowDBResponse = {
  userId: number;
  username: string;
  prompt_pay: number;
  phone: string;
};

export function makePromptPayShowWebResponse(data: PromptPayShowDBResponse) {
  return {
    user_id: data.userId,
    username: data.username,
    promptpay_number: data.prompt_pay,
    phone_number: data.phone,
  };
}
