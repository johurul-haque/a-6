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
    
  }),
});

export const {
  useProfileQuery,
} = baseApi;
