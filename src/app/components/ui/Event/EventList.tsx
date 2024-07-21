import React, { useMemo } from 'react';
import { Text, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { parseISO, isValid } from 'date-fns';
import EventCard from './EventCard';

type Event = {
	description: string;
	end_datetime: string;
	event_id: string;
	event_type: string;
	place: string;
	start_datetime: string;
	team_id: string;
};

type TeamEvents = {
	events: Event[];
	team_id: string;
	team_name: string;
};

type EventListProps = {
	navigation: NativeStackNavigationProp<ParamListBase>;
	orientation: 'vertical' | 'horizontal';
	teamEvents: TeamEvents[];
	isLoading: boolean;
	error: any;
}

const EventList: React.FC<EventListProps> = ({
	navigation,
	orientation,
	teamEvents,
	isLoading,
	error,
}) => {
	const { t } = useTranslation();
	const flattenedEvents = useMemo(() => {
		return teamEvents?.flatMap((team) =>
			team.events.map((event) => ({
				...event,
				team_name: team.team_name,
			}))
		);
	}, [teamEvents]);

	const validEvents = useMemo(() => {
		return flattenedEvents?.filter((event) => {
			const startDate = parseISO(event.start_datetime);
			const endDate = parseISO(event.end_datetime);
			return isValid(startDate) && isValid(endDate);
		});
	}, [flattenedEvents]);

	const sortedEvents = useMemo(() => {
		return validEvents && [...validEvents].sort((a, b) => {
			const dateA = parseISO(a.start_datetime);
			const dateB = parseISO(b.start_datetime);
			return dateA.getTime() - dateB.getTime();
		});
	}, [validEvents]);

	if (isLoading) {
		return <ActivityIndicator size="large" color="#4FD1C5" />;
	}

	if (error) {
		return <Text className="text-red-500">{t("fetchMessages.error")}</Text>;
	}

	const handleEventPress = (event: Event & { team_name: string }) => {
		navigation.navigate('EventDetailPage', {
			event_id: event.event_id,
			coordinates: { latitude: 0, longitude: 0 },
			place: event.place,
			team_name: event.team_name,
			event_name: event.description,
			team_id: event.team_id,
			event_type: event.event_type,
			start_datetime: event.start_datetime,
		});
	};

	const renderItem = ({ item }: { item: Event & { team_name: string } }) => (
		<EventCard
			event={item}
			onPress={() => handleEventPress(item)}
			orientation={orientation}
		/>
	);

	return (
		<FlatList
			data={sortedEvents}
			keyExtractor={(item) => item.event_id}
			renderItem={renderItem}
			horizontal={orientation === 'horizontal'}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={orientation === 'horizontal'}
			contentContainerStyle={
				orientation === 'vertical' ? { paddingHorizontal: 16 } : undefined
			}
		/>
	);
};

export default EventList;
