import { SERVER_DOMAIN } from '@/config';
import { ProductSchema } from '@/types/product';
import { User } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_DOMAIN, credentials: 'include' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    profile: build.query({
      query: () => '/profile',
      transformResponse: (res: { data: User }) => res.data,
    }),
    products: build.query<ProductSchema[], void>({
      query: () => ({ url: '/products', method: 'GET' }),
      transformResponse: (res: { data: ProductSchema[] }) => res.data,
      providesTags: ['Products'],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: '/products/add',
        method: 'POST',
        body,
      }),
      transformResponse: (res: { data: ProductSchema[] }) => res.data,
      invalidatesTags: ['Products'],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useProductsQuery,
  useProfileQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = baseApi;
