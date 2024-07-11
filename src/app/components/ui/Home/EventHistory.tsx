import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import EventList from '../Event/EventList';
import { useListEventsQuery } from '../../../../features/query/eventQueryService';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

interface EventHistoryProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  user: any; // Define the appropriate type for user if possible
}
const EventHistory: React.FC<EventHistoryProps> = ({ navigation, user }) => {
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
