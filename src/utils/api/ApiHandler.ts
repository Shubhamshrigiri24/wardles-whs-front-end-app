import axios from "axios";

export type THTTPVerb = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";

export type TRequest = {
  url?: string;
  headers?: any;
  body?: object;
  method?: THTTPVerb;
  credentials?: "include" | "omit" | "same-origin";
  restProps?: any;
  params?: any;
};

export class ApiHandler {
  makeRequest(requestParams: TRequest) {
    const {
      url = "",
      headers = {},
      body = "",
      method,
      credentials,
      params,
    } = requestParams;

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const requestHeaders = headers
      ? {
          ...defaultHeaders,
          ...headers,
        }
      : defaultHeaders;

    const spreadProps: any = {};

    if (body) {
      // axios accepts "data" not "body"
      spreadProps.data = JSON.stringify(body);
    }

    if (credentials) {
      spreadProps.withCredentials = credentials === "include";
    }

    return axios(url, {
      headers: requestHeaders,
      method,
      withCredentials: true,
      credentials: "include",
      params,
      ...spreadProps,
    }).then(
      (r) => {
        if (r.status < 400) {
          return Promise.resolve(r);
        }

        throw Promise.reject(r);
      },
      (error) => {
        return Promise.reject({
          response: error?.response,
        });
      }
    );
  }

  get(requestParams: TRequest) {
    const { url, headers, credentials, params } = requestParams;
    return this.makeRequest({
      url,
      headers,
      method: "GET",
      credentials,
      params,
    });
  }

  post(requestParams: TRequest) {
    const { url, headers, body, credentials } = requestParams;
    return this.makeRequest({
      url,
      headers,
      body,
      method: "POST",
      credentials,
    });
  }

  put(requestParams: TRequest) {
    const { url, headers, body, credentials } = requestParams;
    return this.makeRequest({ url, headers, body, method: "PUT", credentials });
  }

  patch(requestParams: TRequest) {
    const { url, headers, body, credentials } = requestParams;
    return this.makeRequest({
      url,
      headers,
      body,
      method: "PATCH",
      credentials,
    });
  }

  delete(requestParams: TRequest) {
    const { url, headers, credentials } = requestParams;
    return this.makeRequest({
      url,
      headers,
      method: "DELETE",
      credentials,
    });
  }
}

const API = new ApiHandler();

export default API;
