import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const apiService = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.72.139:8000/api/auth',
		prepareHeaders: async (headers) => {
			// Automatically add the token to requests if it exists
			const token = await AsyncStorage.getItem('access_token');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),

	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
			}),
			onQueryStarted: async (arg, { queryFulfilled }) => {
				const { data } = await queryFulfilled;
				try {
					if (data && data.access_token) {
						console.log('Access Token:', data.access_token); // Confirm it's being logged correctly
						await AsyncStorage.setItem('access_token', data.access_token);
					}
				} catch (error) {
					console.error('Error saving user data or token:', error);
				}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'GET',
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled; // Wait for the logout to complete
					await AsyncStorage.removeItem('access_token'); // Clear the token from storage
				} catch (error) {
					console.error('Error during logout:', error);
				}
			},
		}),
		checkToken: builder.query({
			query: () => ({
				url: '/checkToken',
				method: 'POST', // Assuming your backend uses GET for token checking
			}),
			
		}),
		
		// createEvent: builder.mutation({
		// 	query: (eventData) => ({
		// 	  url: '/events/create',
		// 	  method: 'POST',
		// 	  body: eventData,
		// 	}),
		//   }),
		//   listEvents: builder.query({
		// 	query: (team_id) => ({
		// 	  url: '/events/list',
		// 	  method: 'POST',
		// 	  body:{team_id: team_id},
		// 	}),
		//   }),
		  pushToken: builder.mutation({
            query: (expoToken) => ({
                url: '/push_token',
                method: 'POST',
                body: { token: expoToken }, // Assuming you're sending the token as an object with a token property
            }),
        }),
	}),
});

export const { useLoginMutation, useLogoutMutation, useCheckTokenQuery, usePushTokenMutation } =
	apiService;
export default apiService;