import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import EventList from '../Event/EventList';
import { useListEventsQuery } from '../../../../features/query/eventQueryService';

const EventHistory = ({ navigation, user }) => {
	const {
		data: events = [],
		isError,
		isLoading,
	} = useListEventsQuery(user?.teams);

	console.log(user.teams);

	return (
		<View className="mb-6">
			<Text className="text-xl font-bold text-gray-800 my-4 mx-4">
				Event History
			</Text>
			{events.length > 0 ? (
				<EventList
					navigation={navigation}
					orientation="vertical"
					teamEvents={events}
					isLoading={isLoading}
					error={isError}
				/>
			) : (
				<Text className="text-gray-500">No events found.</Text>
			)}
		</View>
	);
};

export default EventHistory;
