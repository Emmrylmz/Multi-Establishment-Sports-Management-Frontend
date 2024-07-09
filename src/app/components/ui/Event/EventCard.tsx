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

const EventCard = ({ event, onPress, orientation }) => {
	const isTraining = event.event_type?.toLowerCase() === 'training';
	const gradientColors = {
		training: ['#00A99D', '#3FA454'], // Teal to green
		games: ['#3FA454', '#1E5F3E'], // Green to dark green
		accent1: ['#00A99D', '#007A6E'], // Teal to dark teal
		accent2: ['#3FA454', '#67B96E'], // Green to light green
		neutral: ['#4A4A4A', '#242424'], // Gray to dark gray
	};
	const colors = isTraining ? gradientColors.accent1 : gradientColors.games;

  const startDate = parseISO(event.start_datetime);
  const formattedDate = isValid(startDate) 
    ? format(startDate, 'MMM d, yyyy h:mm a')
    : 'Invalid Date';

	return (
		<TouchableOpacity onPress={onPress}>
			<LinearGradient
				colors={colors}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				className={`p-4 rounded-xl mb-4 ${orientation === 'horizontal' ? 'w-72 mr-4' : 'w-full'}`}
			>
				<View className="flex-row justify-between items-center mb-2">
					<Text className="text-lg font-bold text-white">
						{event.event_type}
					</Text>
					<Ionicons name="calendar" size={24} color="#4FD1C5" />
				</View>
				<Text className="text-sm text-gray-300 mb-1">
					{formattedDate}
				</Text>
				<Text className="text-sm text-gray-100 mb-2">{event.place}</Text>
				<Text className="text-xs text-gray-100">{event.team_name}</Text>
				<Text className="text-xs text-gray-100 mt-2 italic">
					{event.description}
				</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default EventCard;
