import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-training.hrm.div4.pgtest.co/api/v1',
    }),
    endpoints: (builder) => ({
        upload: builder.mutation({
            query: (file) => ({
                url: `/employee-document/upload`,
                method: 'POST',
                body: file
            })
        })
    })
})
export const { useUploadMutation } = uploadApi
export default uploadApi