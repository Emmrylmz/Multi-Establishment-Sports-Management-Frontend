import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

// Define a service using a base URL and expected endpoints
const teamQueryService = createApi({
  reducerPath: 'teamQueryService',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (credentials) => ({
        url: '/teams/create',
        method: 'POST',
        body: credentials,
      }),
    }),
    // gets array of team_ids and array of user_ids to add, give only player_ids or only coach_ids array, no check on backend for roles
    insertUsersToTeams: builder.mutation({
      query: ({ user_ids, team_ids }) => ({
        url: '/teams/insert_users_and_teams',
        method: 'GET',
        body: { user_ids: user_ids, team_ids: team_ids },
      }),
    }),
    getTeamUsers: builder.query({
      query: (team_id) => ({
        url: '/teams/get_team_by_id',
        method: 'POST',
        body: { team_ids: team_id },
      }),
    }),
    // New query to get team users by ID
    getTeamUsersById: builder.query({
      query: (team_id) => ({
        url: '/teams/get_team_users',
        method: 'POST',
        body: { team_id: team_id },
      }),
    }),
  }),
});

export const { useCreateTeamMutation, useGetTeamUsersQuery, useInsertUsersToTeamsMutation, useLazyGetTeamUsersQuery, useGetTeamUsersByIdQuery } = teamQueryService;
export default teamQueryService;
