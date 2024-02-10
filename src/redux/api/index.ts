import { SERVER_DOMAIN } from '@/config';
import { User } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_DOMAIN, credentials: 'include' }),
  tagTypes: ['products', 'profile'],
  endpoints: (build) => ({
    profile: build.query({
      query: () => '/profile',
      transformResponse: (res: { data: User }) => res.data,
      providesTags: ['profile'],
    }),
  }),
});

export const { useProfileQuery } = baseApi;
