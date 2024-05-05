import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const eventCreateService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.126:8000/api',
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
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        const { data } = await queryFulfilled;
        try {
          if (data && data.access_token) {
            console.log('Access Token:', data.access_token);
            await AsyncStorage.setItem('access_token', data.access_token);
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
          await queryFulfilled;
          await AsyncStorage.removeItem('access_token');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },
    }),
    checkToken: builder.query({
      query: () => ({
        url: '/auth/checkToken',
        method: 'POST',
      }),
    }),
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events/create',
        method: 'POST',
        body: eventData,
      }),
    }),
    listEvents: builder.query({
      query: (team_id) => ({
        url: '/events/list',
        method: 'POST',
        body:{team_id: team_id},
      }),
    }),
    // Define other endpoints here
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useCheckTokenQuery, 
  useCreateEventMutation, 
  useListEventsQuery 
} = eventCreateService;

export default eventCreateService;
