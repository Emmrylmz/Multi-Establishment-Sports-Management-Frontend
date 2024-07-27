import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type EventCardProps = {
	// type: 'Team training' | 'Meeting' | 'Personal training' | 'Weight lifting' | 'Game',
	event_type: string;
	start_datetime: string;
	end_datetime: string;
	creator_id: string;
	// location: 'Ege Üni. Büyük S.S' | 'Ege Üni. Büyük S.S Üst Kat' | '50. Yıl Spor Salonu' | 'Spor Bil. Fak. Top. Sal.' | 'Spor Bil. Fak. Fitness Sal.' | 'Bornova Anadolu Lisesi' | 'Atletizm Pisti' ,
	place: string;
	team_id: string;
	onPress?: () => void;
};

const getEventTypeStyle = (eventType) => {
  switch (eventType.toLowerCase()) {
    case 'meeting':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'; // Blue: Communication, trust
    case 'team training':
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'; // Green: Growth, harmony
    case 'personal training':
      return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'; // Purple: Individuality, creativity
    case 'weight lifting':
      return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'; // Red: Strength, energy
    case 'game':
      return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'; // Orange: Competition, enthusiasm
    default:
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'; // Default gray
  }
};

const EventCard = ({ event, onPress, orientation }) => {
  const startDate = parseISO(event.start_datetime);
  const endDate = parseISO(event.end_datetime);
  
  const formattedDate = isValid(startDate) 
    ? format(startDate, 'MMM d, yyyy')
    : 'Invalid Date';
  
  const formattedStartTime = isValid(startDate)
    ? format(startDate, 'h:mm a')
    : 'Invalid Time';
  
  const formattedEndTime = isValid(endDate)
    ? format(endDate, 'h:mm a')
    : 'Invalid Time';

  const eventTypeStyle = getEventTypeStyle(event.event_type);

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`p-5 mb-4 bg-white shadow-md dark:bg-dacka-dark-gray rounded-xl ${orientation === 'horizontal' ? 'w-72 mr-4' : 'w-full'}`}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className={`px-3 py-1 rounded-full ${eventTypeStyle}`}>
          <Text className="text-sm font-semibold">
            {event.event_type}
          </Text>
        </View>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {formattedDate}
        </Text>
      </View>
      <Text className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {event.description || 'No description'}
      </Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="location-outline" size={18} color="#6B7280" />
        <Text className="ml-2 text-sm text-gray-600 dark:text-gray-300">
          {event.place || 'No location specified'}
        </Text>
      </View>
      <View className="flex-row items-center mt-2">
        <Ionicons name="time-outline" size={18} color="#6B7280" />
        <Text className="ml-2 text-sm text-gray-600 dark:text-gray-300">
          {formattedStartTime} - {formattedEndTime}
        </Text>
      </View>
      <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {event.team_name}
      </Text>
    </TouchableOpacity>
  );
};


export default EventCard;
