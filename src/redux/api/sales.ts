import { sellingFormSchema } from '@/schema/selling-form-schema';
import { TransactionsData } from '@/types/transactions-data';
import { z } from 'zod';
import { baseApi } from './';

type SalesHistoryResponse = {
  data: { _id: string; total_sales: number }[];
};

type TransactionsResponse = {
  data: TransactionsData[];
};

const salesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sellProduct: build.mutation<
      any,
      { productId: string; body: z.infer<typeof sellingFormSchema> }
    >({
      query: ({ productId, body }) => ({
        url: `/sales`,
        method: 'POST',
        body: {
          productId,
          ...body,
        },
      }),
      invalidatesTags: ['products', 'sales', 'transactions'],
    }),
    salesHistory: build.query({
      query: (categorizeBy: string) =>
        `/sales-history?categorize_by=${categorizeBy}`,
      transformResponse: ({ data }: SalesHistoryResponse) => data,
      providesTags: ['sales'],
    }),
    transactions: build.query<TransactionsData[], void>({
      query: () => '/transactions',
      transformResponse: ({ data }: TransactionsResponse) => data,
      providesTags: ['transactions'],
    }),
  }),
});

export const {
  useSellProductMutation,
  useSalesHistoryQuery,
  useTransactionsQuery,
} = salesApi;
