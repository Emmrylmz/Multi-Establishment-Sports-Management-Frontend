import React from 'react';
import { View, Text } from 'react-native';
import EventList from '../../../components/ui/Event/EventList';
import { useListUpcomingEventsQuery } from '../../../../features/query/eventQueryService';

const UpcomingEvents = ({ navigation, user }) => {
	const {
		data: events,
		isError,
		isLoading,
	} = useListUpcomingEventsQuery(user.teams);

	// console.log(events[0]);

	return (
		<View className="mb-6">
			<Text className="text-xl font-bold text-gray-800 mb-4">
				Upcoming Events
			</Text>
			{events &&
				<EventList
					navigation={navigation}
					orientation="horizontal"
					teamEvents={events || []}
					isLoading={isLoading}
					error={isError}
				/>
			}
		</View>
	);
};

export default UpcomingEvents;
