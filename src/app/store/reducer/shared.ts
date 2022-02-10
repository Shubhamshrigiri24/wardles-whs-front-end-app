import { RSAA } from "redux-api-middleware";

export interface APICallAction {
  type: string;
  [RSAA]: {
    endpoint: string;
    method: string;
    types: [string, string, string];
    body?: string;
  };
}

export interface PostcodeLookupAddress {
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
}

export const defaultPostcodeLookup: PostcodeLookupAddress = {
  line1: "",
  city: "",
  postcode: "",
  country: "",
};

export const queryStringDateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
