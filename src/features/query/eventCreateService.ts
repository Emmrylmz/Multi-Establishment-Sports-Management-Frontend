import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const eventCreateService = createApi({
  reducerPath: 'createEvents',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.72.139:8000/api',
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
  useCheckTokenQuery, 
  useCreateEventMutation, 
  useListEventsQuery 
} = eventCreateService;

export default eventCreateService;
