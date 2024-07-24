import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dreamteam.onrender.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, perPage, sortBy }) => ({
        url: `/products`,
        params: { page, perPage, sortBy },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
