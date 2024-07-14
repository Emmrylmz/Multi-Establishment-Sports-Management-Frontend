import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

const PersonalTrainingService = createApi({
  reducerPath: 'personalTrainingService',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    coach_private_lessons: builder.query({
      query: (coach_id) => ({
        url: `/events/coach_private_lessons/${coach_id}`,
        method: 'GET',
      }),
    })
  }),
});

export const { useCoach_private_lessonsQuery } = PersonalTrainingService;

export default PersonalTrainingService;