import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEmployee } from "../interfaces/Employee";
import { IInitialState } from "../slices/employe";

const employeeApi = createApi({
    reducerPath: "employeeApi",
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
            query: (args: { page: number, size: number, search?: string }) => ({
                url: `employee?page=${args.page}&size=${args.size}&search=${args.search || ""}`,
                method: "GET",
            }),
            transformResponse: (response: { data: IEmployee }) => {
                return response.data
            },
        }),
        getEmployeeById: builder.query({
            query: (id) => ({
                url: `employee/${id}`,
                method: "GET"
            }),
            transformResponse: (response: { data: IEmployee }) => {
                return response.data
            },
        }),
        createEmployee: builder.mutation({
            query: (employee) => ({
                url: "/employee",
                method: "POST",
                body: employee
            }),

        }),
        updateEmployee: builder.mutation({
            query: (id) => ({
                url: `employee/${id}`,
                method: "PUT",
                body: id
            }),
            transformResponse: (response: { data: IInitialState[] }) => {
                return response.data
            },
        }),
        deleteEmployee: builder.mutation({
            query: (record_ids) => ({
                url: `/employee/multiple-delete`,
                method: "DELETE",
                body: { record_ids: record_ids } // Truyền mảng record_ids[]
            }),
            transformResponse: (response: { data: IEmployee }) => {
                return response.data
            },
        }),
        //department
        getDepartments: builder.query({
            query: () => ({
                url: "department",
                method: "GET"
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        })
        ,
        //position
        getPosition: builder.query({
            query: () => ({
                url: "position",
                method: "GET"
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },

        }),
        //gender
        getGender: builder.query({
            query: () => ({
                url: "gender",
                method: "GET"
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),
        //benefit
        getBenefit: builder.query({
            query: () => ({
                url: "benefit",
                method: "GET"
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),
        addBenefit: builder.mutation({
            query: (benefit) => ({
                url: "benefit",
                method: "POST",
                body: benefit
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),
        deleteBenefit: builder.mutation({
            query: (id) => ({
                url: `benefit/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),
        //marriage
        getMarriage: builder.query({
            query: () => ({
                url: "/marriage",
                method: "GET"
            }),
            transformResponse: (response: { data: IEmployee[] }) => {
                return response.data
            },
        }),


    })
})
export const { useGetEmployeesQuery, useGetEmployeeByIdQuery,
    useCreateEmployeeMutation, useUpdateEmployeeMutation, useGetDepartmentsQuery,
    useGetPositionQuery, useGetGenderQuery, useGetBenefitQuery, useAddBenefitMutation,
    useDeleteBenefitMutation, useDeleteEmployeeMutation, useGetMarriageQuery } = employeeApi
export default employeeApi