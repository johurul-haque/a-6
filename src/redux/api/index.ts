import { SERVER_DOMAIN } from '@/config';
import { Product } from '@/types/product';
import { User } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_DOMAIN, credentials: 'include' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    profile: build.query({
      query: () => '/profile',
      transformResponse: ({ data }: { data: User }) => data,
    }),
    products: build.query({
      query: (params) => ({ url: '/products', method: 'GET', params }),
      transformResponse: ({ data }: { data: Product[] }) => data,
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      transformResponse: ({ data }: { data: Product[] }) => data,
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { useProductsQuery, useProfileQuery } = baseApi;
