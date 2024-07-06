import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';


const PaymnentQueryService = createApi({
  reducerPath: 'paymentQueryService',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: (user_id) => ({
        url: `/payments/$${user_id}`,
        method: 'GET',
      }),
    }),
    createPayment: builder.mutation({
      query: (payment) => ({
        url: '/payments',
        method: 'POST',
        body: payment,
      }),
    }),
  }),
});


export const { useGetPaymentQuery, useCreatePaymentMutation } = PaymnentQueryService;

export default PaymnentQueryService;