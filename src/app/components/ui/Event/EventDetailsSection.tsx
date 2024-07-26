// EventDetailsSection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EventDetailsSectionProps {
	team_name: string;
	event_type: string;
	place: string;
	eventDate: Date;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = React.memo(
	({ team_name, event_type, place, eventDate }) => (
    <View className="mb-6">
    <Text className="mb-4 text-xl font-bold text-teal-600">Event Details</Text>
    <View className="flex-row items-center mb-4">
      <Icon name="account-group" size={24} color="#0D9488" className="mr-2" />
      <Text className="mr-1 font-bold text-gray-800 dark:text-gray-100">Team:</Text>
      <Text className="text-gray-800 dark:text-gray-100">{team_name}</Text>
    </View>
    <View className="flex-row items-center mb-4">
      <Icon name="tag" size={24} color="#0D9488" className="mr-2" />
      <Text className="mr-1 font-bold text-gray-800 dark:text-gray-100">Event Type:</Text>
      <Text className="text-gray-800 dark:text-gray-100">{event_type}</Text>
    </View>
    <View className="flex-row items-center mb-4">
      <Icon name="map-marker" size={24} color="#0D9488" className="mr-2" />
      <Text className="mr-1 font-bold text-gray-800 dark:text-gray-100">Place:</Text>
      <Text className="text-gray-800 dark:text-gray-100">{place}</Text>
    </View>
    <View className="flex-row items-center mb-4">
      <Icon name="calendar" size={24} color="#0D9488" className="mr-2" />
      <Text className="mr-1 font-bold text-gray-800 dark:text-gray-100">Date:</Text>
      <Text className="text-gray-800 dark:text-gray-100">{eventDate.toDateString()}</Text>
    </View>
  </View>
	)
);

export default EventDetailsSection;
