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
        providesTags: ['CoachLessons'],
      }),
    }),
    create_private_lesson: builder.mutation({
      query: (data) => ({
        url: '/events/create/private_lesson',
        method: 'POST',
        body: data,
        invalidatesTags: ['CoachLessons'],
      }),
    }),
    private_lessons_history: builder.query({
      query: (user_id) => ({
        url: `/events/private_lessons_history/${user_id}`,
        method: 'GET',
      }),
    }),
    approved_private_lessons: builder.query({
      query: (user_id) => ({
        url: `/events/approved_private_lessons/${user_id}`,
        method: 'GET',
      }),
    }),
    approve_private_lesson: builder.mutation({
      query: (data) => ({
        url: `/events/create/private_lesson_response/${data._id}`,
        method: 'POST',
        body: data,
        invalidatesTags: ['CoachLessons'],
      }),
    }),
    declined_private_lessons: builder.query({
      query: (user_id) => ({
        url: `/events/declined_private_lessons/${user_id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  useCoach_private_lessonsQuery,
  useCreate_private_lessonMutation,
  usePrivate_lessons_historyQuery,
  useApproved_private_lessonsQuery,
  useDeclined_private_lessonsQuery,
  useApprove_private_lessonMutation,
} = PersonalTrainingService;

export default PersonalTrainingService;