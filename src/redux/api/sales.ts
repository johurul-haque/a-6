import { baseApi } from './';

type SalesHistoryResponse = {
  data: { _id: string; total_sales: number }[];
};

const salesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    salesHistory: build.query({
      query: (categorizeBy: string) =>
        `/sales-history?categorize_by=${categorizeBy}`,
      transformResponse: ({ data }: SalesHistoryResponse) => data,
      providesTags: ['sales'],
    }),
  }),
});

export const { useSalesHistoryQuery } = salesApi;
