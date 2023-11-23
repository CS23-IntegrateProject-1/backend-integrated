type TosShowWebRequest = {};

type TosShowWebResponse = {
  user_id: number;
  consented: boolean;
};

export type TosShowDBResponse = {
  userId: number;
  privacy_consent: boolean;
};

type Tos = TosShowDBResponse;

export type TosUpdateDBResponse = TosShowDBResponse;

export type TosUpdateWebResponse = TosShowWebResponse;

export type TosStoreWebResponse = TosShowWebResponse;

export type TosStoreDBResponse = TosShowDBResponse;

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
  data: TosStoreDBResponse,
): TosStoreWebResponse {
  return {
    user_id: data.userId,
    consented: data.privacy_consent,
  };
}
