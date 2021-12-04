import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-rapidapi-host": "newsx.p.rapidapi.com",
  "x-rapidapi-key": "9b194bfefamshf1bc8a9bd5bb506p10e0bbjsn8e11aa1070ae",
};

const baseUrl = "https://newsx.p.rapidapi.com/search";

const createRequest = (url) => {
  return { url, headers: cryptoNewsHeaders };
};

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => {
    return {
      getCryptoNews: builder.query({
        query: ({ newsCategory, count }) => {
          return createRequest(`?q=${newsCategory}&limit=${count}`);
        },
      }),
    };
  },
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
