export type AboutIndexWebRequest = any;

export type AboutShowWebRequest = {
  aboutId: number;
};

export type AboutStoreWebRequest = {
  version: string;
  detail: string;
};

export type AboutUpdateWebRequest = {
  aboutId: number;
  version: string;
  detail: string;
};

export type AboutDestroyWebRequest = any;

export type AboutIndexWebResponse = any;

export type AboutShowWebResponse = any;

export type AboutStoreWebResponse = any;

export type AboutUpdateWebResponse = any;

export type AboutDestroyWebResponse = any;

export type AboutIndexDBResponse = [AboutShowDBResponse];

export type AboutShowDBResponse = {
  version: string;
  detail: string | null;
  last_update: Date;
  aboutAppId: number;
};

export type AboutStoreDBResponse = AboutShowDBResponse;

export type AboutUpdateDBResponse = AboutShowDBResponse;

export type AboutDestroyDBResponse = any;

export function makeAboutShowWebResponse(
  data: AboutShowDBResponse,
): AboutShowWebResponse {
  return {
    version: data.version,
    detail: data.detail !== undefined ? data.detail : "",
    last_update: data.last_update,
    id: data.aboutAppId,
  };
}

export function makeAboutIndexWebResponse(
  data: AboutIndexDBResponse,
): AboutIndexWebResponse {
  return data.map((d: AboutShowDBResponse) => ({
    version: d.version,
    detail: d.detail !== undefined ? d.detail : "",
    last_update: d.last_update,
    id: d.aboutAppId,
  }));
}

export function makeAboutStoreWebResponse(
  data: AboutStoreDBResponse,
): AboutStoreWebResponse {
  return {
    id: data.aboutAppId,
    version: data.version,
    detail: data.detail !== undefined ? data.detail : "",
    last_update: data.last_update,
  };
}

export function makeAboutUpdateWebResponse(
  data: AboutUpdateDBResponse,
): AboutStoreWebResponse {
  return {
    id: data.aboutAppId,
    version: data.version,
    detail: data.detail !== undefined ? data.detail : "",
    last_update: data.last_update,
  };
}
