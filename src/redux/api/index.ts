import { SERVER_DOMAIN } from '@/config';
import { LoginPayload, RegisterPayload } from '@/schema/auth-form-schema';
import { User } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_DOMAIN, credentials: 'include' }),
  tagTypes: ['products', 'profile'],
  endpoints: (build) => ({
    register: build.mutation({
      query: (body: RegisterPayload) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    login: build.mutation({
      query: (body: LoginPayload) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    profile: build.query({
      query: () => '/profile',
      transformResponse: (res: { data: User }) => res.data,
      providesTags: ['profile'],
    }),
    logout: build.mutation({
      query: (body) => ({ url: '/logout', method: 'POST', body }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['profile'],
    }),
    deleteAccount: build.mutation({
      query: (body: { password: string }) => ({
        url: '/profile/delete',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useProfileQuery,
  useLogoutMutation,
  useDeleteAccountMutation,
} = baseApi;
