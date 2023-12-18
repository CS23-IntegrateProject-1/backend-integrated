type PrivacyPolicyShowWebResponse = {
  user_id: number;
  consented_privacy: boolean;
  consented_cookie: boolean;
};

export type PrivacyPolicyShowDBResponse = {
  userId: number;
  privacy_consent: boolean;
  cookie_consent: boolean;
};

export type PrivacyPolicyUpdateDBResponse = PrivacyPolicyShowDBResponse;

export type PrivacyPolicyUpdateWebResponse = PrivacyPolicyShowWebResponse;

export type PrivacyPolicyStoreWebResponse = PrivacyPolicyShowWebResponse;

export type PrivacyPolicyStoreDBResponse = PrivacyPolicyShowDBResponse;

export function makePrivacyPolicyWebResponse(
  data: PrivacyPolicyShowDBResponse,
): PrivacyPolicyShowWebResponse {
  return {
    user_id: data.userId,
    consented_privacy: data.privacy_consent,
    consented_cookie: data.cookie_consent,
  };
}

export function makePrivacyPolicyUpdateWebResponse(
  data: PrivacyPolicyUpdateDBResponse,
): PrivacyPolicyUpdateWebResponse {
  return {
    user_id: data.userId,
    consented_privacy: data.privacy_consent,
    consented_cookie: data.cookie_consent,
  };
}

export function makePrivacyPolicyStoreWebResponse(
  data: PrivacyPolicyStoreDBResponse,
): PrivacyPolicyStoreWebResponse {
  return {
    user_id: data.userId,
    consented_privacy: data.privacy_consent,
    consented_cookie: data.cookie_consent,
  };
}
