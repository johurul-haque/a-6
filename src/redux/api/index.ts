import { SERVER_DOMAIN } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_DOMAIN, credentials: 'include' }),
  endpoints: (build) => ({
    profile: build.query({
      query: () => '/profile',
    }),
    products: build.query({
      query: () => '/products',
    }),
  }),
});

export const { useProductsQuery, useProfileQuery } = baseApi;
