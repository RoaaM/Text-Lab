import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { getAPIUrl } from '../utils/Utils';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/",

  //   prepareHeaders: (headers, { getState }) => {
  //     // By default, if we have a token in the store, let's use that for authenticated requests

  //     const { token } = (getState() as AppState).auth;

  //     if (token) {
  //       headers.set("Authorization", `Token ${token}`);
  //     }
  //     return headers;
  //   },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default api;
