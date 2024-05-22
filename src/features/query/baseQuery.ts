import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearAuthState, setUser } from '../auth/auth.slice'; // Adjust the import path as needed
const baseQuery = fetchBaseQuery({
	baseUrl:`http://${process.env.API_SOURCE}/api`, // Adjust the base URL if needed
	prepareHeaders: async (headers) => {
		const token = await AsyncStorage.getItem('access_token');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	},
});
console.log(process.env.API_SOURCE)

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		// Try to get a new token
		const refreshResult = await baseQuery(
			{
				url: '/auth/refresh_token', // Adjust the endpoint URL if needed
				method: 'GET',
			},
			api,
			extraOptions
		);

		if (refreshResult.data) {
			await AsyncStorage.setItem('access_token', refreshResult.data.access_token);
			// Retry the original request
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(clearAuthState());
			await AsyncStorage.removeItem('access_token');
			await AsyncStorage.removeItem('refresh_token');
		}
	}

	return result;
};

export { baseQuery, baseQueryWithReauth };
