import React from 'react';
import { View, Text } from 'react-native';
import EventList from '../../../components/ui/Event/EventList';
import { useListUpcomingEventsQuery } from '../../../../features/query/eventQueryService';
import { useTranslation } from 'react-i18next';

const UpcomingEvents = ({ navigation, user }) => {
	const {
		data: events,
		isError,
		isLoading,
		refetch
	} = useListUpcomingEventsQuery(user.teams);

	const { t } = useTranslation();

	return (
		<View className="mb-6">
			<Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100">
				{t("upcomingEvents.title")}
			</Text>
			{events &&
				<EventList
					navigation={navigation}
					orientation="horizontal"
					teamEvents={events || []}
					isLoading={isLoading}
					error={isError}
					refetch={refetch}
				/>
			}
		</View>
	);
};

export default UpcomingEvents;
