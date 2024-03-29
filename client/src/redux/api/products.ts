import { sellingFormSchema } from '@/schema/selling-form-schema';
import { Product } from '@/types/product';
import { Params } from '@/types/query-params';
import { z } from 'zod';
import { baseApi } from '.';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    products: build.query<Product[], Params | undefined>({
      query: (params) => ({ url: '/products', method: 'GET', params }),
      transformResponse: (res: { data: Product[] }) => res.data,
      providesTags: ['products'],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: '/products/add',
        method: 'POST',
        body,
      }),
      transformResponse: (res: { data: Product[] }) => res.data,
      invalidatesTags: ['products'],
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
      invalidatesTags: ['products'],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
    bulkDelete: build.mutation({
      query: (productIds: string[]) => ({
        url: '/products/bulk-delete',
        method: 'DELETE',
        body: { productIds },
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useBulkDeleteMutation,
  useDeleteProductMutation,
} = productsApi;
