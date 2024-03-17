import { LoginPayload, RegisterPayload } from '@/schema/auth-form-schema';
import { User } from '@/types/user';
import { baseApi } from '.';

type AuthResponse = {
  user: User;
  token: string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body: RegisterPayload) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
      transformResponse: ({ data }: { data: AuthResponse }) => data,
      transformErrorResponse: (response) => response.data,
    }),
    login: build.mutation({
      query: (body: LoginPayload) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      transformResponse: ({ data }: { data: AuthResponse }) => data,
      transformErrorResponse: (response) => response.data,
    }),
    logout: build.mutation({
      query: (body) => ({ url: '/logout', method: 'POST', body }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['profile'],
    }),
    deleteAccount: build.mutation({
      query: (body: { password: string }) => ({
        url: '/profile/delete',
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useDeleteAccountMutation,
} = authApi;
