import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';


const PaymnentQueryService = createApi({
  reducerPath: 'paymentQueryService',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: (user_id) => ({
        url: `/payments/${user_id}`,
        method: 'GET',
      }),
    }),
    createPayment: builder.mutation({
      query: (payment) => ({
        url: '/payments/create_payment_for_months',
        method: 'POST',
        body: payment,
      }),
    }),
    getMonthlyRevenue: builder.query({
      query:(body) => ({
        url: '/payments/get_monthly_revenue',
        method: 'POST',
        body: body,
      }),
    }),
    getYearlyRevenue: builder.query({
      query:(body) => ({
        url: '/payments/get_yearly_revenue',
        method: 'POST',
        body: body,
      }),
    }),
    getRevenueByMonthRange: builder.query({
      query:(body) => ({
        url: '/payments/get_revenue_by_month_range',
        method: 'POST',
        body: body,
      }),
    }),
    getUserPaymentYears: builder.query({
      query: (data) => ({
        url: `/payments/${data.user_id}/${data.year}`,
        method: 'GET',
      }),
    }),
  }),
});


export const { useGetPaymentQuery, useCreatePaymentMutation, useGetMonthlyRevenueQuery, useGetYearlyRevenueQuery,useGetRevenueByMonthRangeQuery, useGetUserPaymentYearsQuery } = PaymnentQueryService;

export default PaymnentQueryService;