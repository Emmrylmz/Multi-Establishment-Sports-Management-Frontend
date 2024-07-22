
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

const ConstantsQueryService = createApi({
  reducerPath: 'constantsQueryService',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getConstants: builder.query({
      query: () => ({
        url: '/constants/all',
        method: 'GET',
      }),
    }),
    createConstant: builder.mutation({
      query: (constant) => ({
        url: '/constants/create',
        method: 'POST',
        body: constant,
      }),
    }),
    updateConstant: builder.mutation({
      query: (constant) => ({
        url: `/constants/update/${constant.id}`,
        method: 'PUT',
        body: constant,
      }),
    }),
    deleteConstant: builder.mutation({
      query: (constant) => ({
        url: `/constants/delete/${constant.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetConstantsQuery, useCreateConstantMutation, useUpdateConstantMutation, useDeleteConstantMutation } = ConstantsQueryService;
export default ConstantsQueryService;