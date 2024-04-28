import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.5:8000/api/auth',
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
      onQueryStarted: async ({ queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data && data.access_token) {
            // Assuming the API responds with user info and token
            await AsyncStorage.setItem('access_token', data.access_token);
            // Store user data in both Redux and AsyncStorage
          }
        } catch (error) {
          // console.error('Error saving user data or token:', error);
        }
      },
    }),
    checkToken: builder.query({
      query: () => ({
        url: '/checkToken',
        method: 'POST', // Assuming your backend uses GET for token checking
      }),
    }),
    // Define other endpoints here
  }),
});

export const { useLoginMutation, useCheckTokenQuery } = apiService;
export default apiService;
