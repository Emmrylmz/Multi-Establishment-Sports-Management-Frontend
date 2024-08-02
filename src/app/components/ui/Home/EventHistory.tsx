import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import EventList from '../Event/EventList';
import { useListEventsQuery } from '../../../../features/query/eventQueryService';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import LoadingIndicator from '../fetch/LoadingIndicator';

type EventHistoryProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  user: any; // Define the appropriate type for user if possible
}
const EventHistory: React.FC<EventHistoryProps> = ({ navigation, user }) => {
	const {
		data: events = [],
		isError,
		isLoading,
		refetch
	} = useListEventsQuery(user?.teams);

	console.log(user.teams);

	if(isLoading){
		return <LoadingIndicator isLoading={isLoading}	/>
	}

	return (
		<View className="mb-6">
			<Text className="mx-4 my-4 text-xl font-bold text-gray-800">
				Event History
			</Text>
			{events.length > 0 && (
				<EventList
					navigation={navigation}
					orientation="vertical"
					teamEvents={events}
					isLoading={isLoading}
					refetch={refetch}
					error={isError}
				/>
			)}
		</View>
	);
};

export default EventHistory;
