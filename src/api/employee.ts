import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEmployee } from "../interfaces/Employee";

const employeeApi = createApi({
    reducerPath: "employee",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api-training.hrm.div4.pgtest.co/api/v1",
        prepareHeaders: (headers, { }) => {
            const token = localStorage.getItem('token') || '';
            if (token) {
                headers.set('Authorization', 'Bearer ' + token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => ({
                url: "employee",
                method: "GET",
            

            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),
        getEmployeeById: builder.query({
            query: (id) => ({
                url: `employee/${id}`,
                method: "GET"
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),
        createEmployee: builder.mutation({
            query: (employee) => ({
                url: "employee",
                method: "POST",
                body: employee
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),
        updateEmployee: builder.mutation({
            query: (employee) => ({
                url: `employee/${employee.id}`,
                method: "PUT",
                body: employee
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        })
    })
})
export const { useGetEmployeesQuery, useGetEmployeeByIdQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation } = employeeApi
export default employeeApi