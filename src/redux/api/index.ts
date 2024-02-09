import { SERVER_DOMAIN } from '@/config';
import { sellingFormSchema } from '@/schema/selling-form-schema';
import { Product } from '@/types/product';
import { Params } from '@/types/query-params';
import { User } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_DOMAIN, credentials: 'include' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    profile: build.query({
      query: () => '/profile',
      transformResponse: (res: { data: User }) => res.data,
    }),
    products: build.query<Product[], Params | undefined>({
      query: (params) => ({ url: '/products', method: 'GET', params }),
      transformResponse: (res: { data: Product[] }) => res.data,
      providesTags: ['Products'],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: '/products/add',
        method: 'POST',
        body,
      }),
      transformResponse: (res: { data: Product[] }) => res.data,
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation<
      Product,
      { id: string; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: { data: Product }) => res.data,
      invalidatesTags: ['Products'],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    sellProduct: build.mutation<
      any,
      { productId: string; body: z.infer<typeof sellingFormSchema> }
    >({
      query: ({ productId, body }) => ({
        url: `/sell/${productId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useProductsQuery,
  useProfileQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSellProductMutation,
} = baseApi;
