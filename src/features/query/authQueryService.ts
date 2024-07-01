import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

// Define a service using a base URL and expected endpoints
const authQueryService = createApi({
	reducerPath: 'authQueryService',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
			onQueryStarted: async (arg, { queryFulfilled }) => {
				const { data } = await queryFulfilled;
				try {
					if (data && data.access_token) {
						await AsyncStorage.setItem('access_token', data.access_token);
						await AsyncStorage.setItem('refresh_token', data.refresh_token); // Store refresh token
					}
				} catch (error) {
					console.error('Error saving user data or token:', error);
				}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'GET',
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled; // Wait for the logout to complete
					await AsyncStorage.removeItem('access_token'); // Clear the token from storage
					await AsyncStorage.removeItem('refresh_token'); // Clear the refresh token from storage
				} catch (error) {
					console.error('Error during logout:', error);
				}
			},
		}),
		register: builder.mutation({
			query: (user_data) => ({
				url: '/auth/register',
				method: 'POST',
				body: user_data,
			}),
		}),
		checkToken: builder.query({
			query: () => ({
				url: '/auth/checkToken',
				method: 'POST', // Assuming your backend uses GET for token checking
			}),
		}),
		pushToken: builder.mutation({
			query: (expoToken) => ({
				url: '/auth/push_token',
				method: 'POST',
				body: { token: expoToken }, // Assuming you're sending the token as an object with a token property
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useCheckTokenQuery,
	usePushTokenMutation,
	useRegisterMutation,
} = authQueryService;
export default authQueryService;