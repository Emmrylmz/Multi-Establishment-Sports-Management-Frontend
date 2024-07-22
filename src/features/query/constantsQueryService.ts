import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

const constantsQueryService = createApi({
	reducerPath: 'constantsQueryService',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getConstantFromKey: builder.query({
			query: (key) => ({
				url: `/constants/get/key/${key}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetConstantFromKeyQuery } = constantsQueryService;
export default constantsQueryService;
