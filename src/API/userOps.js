import { useNavigate } from "react-router-dom";
const API_ENDPOINT =
  "https://3ms0k4a2ke.execute-api.eu-west-2.amazonaws.com/dev/";

export function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      productCode: "fp",
    }),
  };
  fetch(API_ENDPOINT + "access/login", requestOptions)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        console.log(error);
      }
      useNavigate("/MyProfile");
    })
    .catch((error) => {
      this.setState({ errorMessage: error.toString() });
      console.error("There was an error!", error);
    });
}

export function accessStart(
  email,
  password,
  phoneNumber,
  firstName,
  lastName,
  pharmacyName,
  pharmacyCode,
  pharmcyAccountNumber,
  productCode
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      pharmcyAccountNumber: pharmcyAccountNumber,
      pharmacyName: pharmacyName,
      pharmacyCode: pharmacyCode,
      productCode: productCode,
    }),
  };
  fetch(API_ENDPOINT + "access/start", requestOptions)
    .then((res) => res.json())
    .then(
      (data) => {
        console.log("Data from Start API - ", data);
      },
      (error) => {
        console.error("There was an error!", error);
      }
    );
}

export function AccessComplete(rnd, token) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token, productCode: "fp" }),
  };
  fetch(API_ENDPOINT + "access/complete/" + rnd, requestOptions)
    .then((res) => res.json())
    .then(
      (data) => {
        console.log("Access details : ", data);
        if (data.accessToken !== undefined) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("expirationDate", data.expirationDate);
          localStorage.setItem("idToken", data.idToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      },
      (error) => {
        console.error("There was an error!", error);
      }
    );
}

// export const logout = (apiEndpoint = API_ENDPOINT) => ({
//   [RSAA]: {
//     endpoint: `${apiEndpoint}/logout`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     // Body assigned by middleware
//     types: [LOGOUT_REQUEST, LOGOUT_RECEIVE, LOGOUT_FAILURE],
//     options: { addAuth: true, authStage: LOGOUT }
//   }
// });

// export const refresh = (apiEndpoint = API_ENDPOINT) => ({
//   [RSAA]: {
//     endpoint: `${apiEndpoint}/refresh`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     // Body assigned by middleware
//     types: [REFRESH_REQUEST, REFRESH_RECEIVE, REFRESH_FAILURE],
//     options: { authStage: REFRESH }
//   }
// });

// export const bypassAuth = (email, apiEndpoint = BYPASS_API_ENDPOINT) => ({
//   [RSAA]: {
//     endpoint: apiEndpoint,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ email }),
//     types: [BYPASS_AUTH_REQUEST, BYPASS_AUTH_RECEIVE, BYPASS_AUTH_FAILURE]
//   }
// });

// export const authenticationError = () => ({
//   type: AUTHENTICATION_ERROR
// });
