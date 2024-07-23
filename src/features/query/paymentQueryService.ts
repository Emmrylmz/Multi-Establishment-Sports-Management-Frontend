import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import type { Payment } from '../../utils/types';
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
			query: (body) => ({
				url: '/payments/get_monthly_revenue',
				method: 'POST',
				body: body,
			}),
		}),
		getYearlyRevenue: builder.query({
			query: (body) => ({
				url: '/payments/get_yearly_revenue',
				method: 'POST',
				body: body,
			}),
		}),
		getRevenueByMonthRange: builder.query({
			query: (body) => ({
				url: '/payments/get_revenue_by_month_range',
				method: 'POST',
				body: body,
			}),
		}),
		getPaymentByYearQuery: builder.query<
			Payment[],
			{ userId: string; year: number }
		>({
			query: ({ userId, year }) => ({
				method: 'GET',
				url: `/payments/${userId}/${year}`,
			}),
		}),
		personalTrainingResponse: builder.mutation({
			query: (pt_data) => ({
				url: `/payments/private-lessons/${pt_data.lesson_id}/pay`,
				method: 'POST',
				body: pt_data,
			}),
		}),
		getUserPaymentsByYear: builder.query({
			query: (data) => ({
				url: `/payments/${data.user_id}/${data.year}`,
				method: 'GET',
				keepUnusedDataFor: 300,
			}),
		}),
		makeSinglePayment: builder.mutation<Payment, Partial<Payment>>({
			query: (payment) => ({
				url: '/payments/make_single_payment',
				method: 'POST',
				body: payment,
			}),
		}),
		updatePayment: builder.mutation({
			query: (payment) => ({
				url: `/payments/update/${payment._id}`,
				method: 'PUT',
				body: payment,
			}),
		}),
	}),
});

export const {
	useGetPaymentQuery,
	useCreatePaymentMutation,
	useGetMonthlyRevenueQuery,
	useGetYearlyRevenueQuery,
	useGetRevenueByMonthRangeQuery,
	useGetPaymentByYearQueryQuery,
	usePersonalTrainingResponseMutation,
	useGetUserPaymentsByYearQuery,
	useMakeSinglePaymentMutation,
	useUpdatePaymentMutation
} = PaymnentQueryService;

export default PaymnentQueryService;
