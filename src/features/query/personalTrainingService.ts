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
    }),
    create_private_lesson: builder.mutation({
      query: (data) => ({
        url: '/events/create/private_lesson',
        method: 'POST',
        body: data,
      }),
    })
  }),
});

export const { useCoach_private_lessonsQuery,useCreate_private_lessonMutation } = PersonalTrainingService;

export default PersonalTrainingService;