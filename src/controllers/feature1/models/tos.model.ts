import { Term_of_services } from "@prisma/client";

type TosShowWebResponse = {
  user_id: number;
  consented: boolean;
};

export type TosShowDBResponse = {
  userId: number;
  privacy_consent: boolean;
};

export type TosUpdateDBResponse = TosShowDBResponse;

export type TosUpdateWebResponse = TosShowWebResponse;

export type TosStoreWebResponse = TosShowWebResponse;

export function makeTosWebResponse(
  data: TosShowDBResponse,
): TosShowWebResponse {
  return {
    user_id: data.userId,
    consented: data.privacy_consent,
  };
}

export function makeTosUpdateWebResponse(
  data: TosUpdateDBResponse,
): TosUpdateWebResponse {
  return {
    user_id: data.userId,
    consented: data.privacy_consent,
  };
}

export function makeTosStoreWebResponse(
  data: Term_of_services,
): TosStoreWebResponse {
  return {
    user_id: data.userId,
    consented: data.privacy_consent,
  };
}
