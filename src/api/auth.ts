import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-training.hrm.div4.pgtest.co/api/v1',
        prepareHeaders: (headers, { }) => {
            const token = localStorage.getItem('token') || '';
            if (token) {
                headers.set('Authorization', 'Bearer ' + token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: `login`,
                method: 'POST',
                body: user

            }),

        }),
        logout: builder.mutation({
            query: () => ({
                url: `logout`,
                method: 'POST',
            }),
        }),
        resetPassword: builder.mutation({
            query: (user) => ({
                url: `reset-password`,
                method: 'POST',
                body: user
            }),
        }),
        forgotPassword: builder.mutation({
            query: (user) => ({
                url: `forgot-password`,
                method: 'POST',
                body: user
            }),
        }),
        changePassword: builder.mutation({
            query: (user) => ({
                url: `change-password`,
                method: 'POST',
                body: user
            }),
        }),
        getCompanys: builder.query({
            query: () => ({
                url: `company`,
                method: 'GET',
            }),
        })
    }),
})
export const { useLoginMutation, useGetCompanysQuery, useLogoutMutation, useResetPasswordMutation, useForgotPasswordMutation , useChangePasswordMutation} = authApi
export default authApi