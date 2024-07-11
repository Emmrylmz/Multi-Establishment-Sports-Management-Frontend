import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utils/tokenManager';

const baseQuery = fetchBaseQuery({
	baseUrl: `http://192.168.1.36:80/api`, // Adjust the base URL if needed

	prepareHeaders: async (headers) => {
		const token = await getToken('access_token');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export { baseQuery };
