import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "9b194bfefamshf1bc8a9bd5bb506p10e0bbjsn8e11aa1070ae",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => {
  return { url, headers: cryptoApiHeaders };
};

export const crypotApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => {
    return {
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`),
      }),
      getCryptoDetails: builder.query({
        query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
      getCryptoHistory: builder.query({
        query: ({ coinId, timePeriod }) =>
          createRequest(`/coin/${coinId}/history/${timePeriod}`),
      }),
    };
  },
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = crypotApi;
