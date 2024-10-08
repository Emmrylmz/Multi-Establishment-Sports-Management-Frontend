import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

const userInfoQueryService = createApi({
	reducerPath: 'userInfoQueryService',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['UserInfo'], // Add this line
	endpoints: (builder) => ({
		getUserInfo: builder.query({
			query: (user_id) => ({
				url: `/user_info/${user_id}`,
				method: 'POST',
				body: { user_id: user_id },
			}),
			providesTags: (result, error, user_id) => [
				{ type: 'UserInfo', id: user_id },
			],
		}),
		searchUsers: builder.query({
			query: ({ query = '', province = '' }) => ({
				url: '/user_info/users/search',
				params: { query, province },
			}),
			providesTags: ['UserInfo'],
		}),
	}),
});

export const { useGetUserInfoQuery, useSearchUsersQuery, useLazySearchUsersQuery } =
	userInfoQueryService;
export default userInfoQueryService;
