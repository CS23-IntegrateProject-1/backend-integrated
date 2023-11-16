type PromptPayUpdateWebRequest = {};

export type PromptPayUpdateWebResponse = {
  user_id: number;
  username: string;
  promptpay_number: number;
};

type PromptPayUpdateDBRequest = {};

export type PromptPayUpdateDBResponse = {
  userId: number;
  username: string;
  prompt_pay: number;
};

export function makePromptPayUpdateWebResponse(
  data: PromptPayUpdateDBResponse,
): PromptPayUpdateWebResponse {
  return {
    user_id: data.userId,
    username: data.username,
    promptpay_number: data.prompt_pay,
  };
}
