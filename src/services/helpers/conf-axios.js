import axios from "axios";
import { BASE_URL } from "../../constants/const-path-api";
// import Cookies from "js-cookie";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";

// import store from "../features/_store";
// import { setError } from "../features/system";
// import pick from 'lodash/pick';

// if (process.browser) {
//   if (!Cookies.get(`Fingerprint`)) {
//     // Initialize an agent at application startup.
//     const fpPromise = FingerprintJS.load();

//     (async () => {
//       // Get the visitor identifier when you need it.
//       const fp = await fpPromise;
//       const result = await fp.get();

//       // This is the visitor identifier:
//       Cookies.set("Fingerprint", result.visitorId);
//     })();
//   }
// }

const REQUEST_TIMEOUT = 50000;

const HttpCode = {
  UNAUTHORIZED: 401,
};

const onUnauthorized = (res) => {
  return res;
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      origin: BASE_URL,
    },
  });

  const onSuccess = (response) => response;
  const onFail = ({ response }) => {
    // store.dispatch(setError(pick(response, ["data", "statusText", "status"])));
    if (response?.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }
    throw response;
  };

  api.interceptors.response.use(onSuccess, onFail);

  const requestHandler = (request) => {
    // (request.headers["Authorization"] = "19cedeae-9496-4a25-af06-5a2af2b15567"),
    //   (request.headers["Fingerprint"] = "admin fingerprint");
    return request;
  };
  api.interceptors.request.use((request) => requestHandler(request));

  return api;
};

export const API = createAPI(onUnauthorized);
