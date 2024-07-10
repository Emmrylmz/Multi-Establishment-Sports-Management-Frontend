import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

// Define a service using a base URL and expected endpoints
const eventQueryService = createApi({
	reducerPath: 'eventQueryService',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Events', 'Attendances', 'UserInfo'], // Add 'UserInfo' here
	endpoints: (builder) => ({
		createEvent: builder.mutation<void, Partial<Event>>({
			query: (eventData) => ({
				url: '/events/create',
				method: 'POST',
				body: eventData,
			}),
			async onQueryStarted(eventData, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					// Invalidate the listEvents query to refetch the data
					dispatch(
						eventQueryService.util.invalidateTags([
							{ type: 'Events', id: 'LIST' },
						])
					);
				} catch {
					// Handle the error here
				}
			},
			invalidatesTags: ['Events'],
		}),
		listEvents: builder.query({
			query: (team_id) => ({
				url: '/events/get_team_events',
				method: 'POST',
				body: { team_ids: team_id },
			}),
			providesTags: ['Events'],
		}),
		listUpcomingEvents: builder.query({
			query: (team_id) => ({
				url: '/events/get_upcoming_events',
				method: 'POST',
				body: { team_ids: team_id },
			}),
			providesTags: ['Events'],
		}),
		getEvent: builder.query({
			query: (event_id) => ({
				url: `/events/${event_id}`,
				method: 'GET',
			}),
		}),
		updateEvent: builder.mutation({
			query: ({ event_id, updatedEventData }) => ({
				url: `/events/${event_id}`,
				method: 'POST',
				body: { event_id: event_id, payload: updatedEventData },
			}),
		}),
		deleteEvent: builder.mutation({
			query: (event_id) => ({
				url: `/events/${event_id}`,
				method: 'DELETE',
			}),
		}),
		addAttendancesToEvent: builder.mutation({
			query: (attendanceForm) => ({
				url: `/events/add_attendances_to_event`,
				method: 'POST',
				body: attendanceForm,
			}),
			invalidatesTags: (result, error, attendanceForm) => [
				{ type: 'Attendances', id: attendanceForm.event_id },
				...attendanceForm.attendances.map((att) => ({
					type: 'UserInfo',
					id: att.user_id,
				})),
			],
		}),
		fetchAttendancesByEventId: builder.query({
			query: (event_id) => ({
				url: `/events/fetch_attendances_for_event`,
				method: 'POST',
				body: { event_id: event_id },
			}),
			providesTags: (result, error, event_id) => [
				{ type: 'Attendances', id: event_id },
			],
		}),
		updateAttendances: builder.mutation({
			query: (newAttendanceForm) => ({
				url: `/events/update_attendances`,
				method: 'PUT',
				body: newAttendanceForm,
			}),
			invalidatesTags: (result, error, newAttendanceForm) => [
				{ type: 'Attendances', id: newAttendanceForm.event_id },
				...newAttendanceForm.attendances.map((att) => ({
					type: 'UserInfo',
					id: att.user_id,
				})),
			],
		}),
		// Define other endpoints here
	}),
});

export const {
	useCreateEventMutation,
	useListEventsQuery,
	useGetEventQuery,
	useUpdateEventMutation,
	useDeleteEventMutation,
	useAddAttendancesToEventMutation,
	useFetchAttendancesByEventIdQuery,
	useListUpcomingEventsQuery,
	useUpdateAttendancesMutation,
} = eventQueryService;

export const selectListEventsResult =
	eventQueryService.endpoints.listEvents.select;

export default eventQueryService;
