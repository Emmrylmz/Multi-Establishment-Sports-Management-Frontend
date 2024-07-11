// components/CoachNotes.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Note {
	id: string;
	content: string;
	timestamp: string;
	coachName: string;
}

interface CoachNotesProps {
	playerName: string;
	notes: Note[];
}

const CoachNotes: React.FC<CoachNotesProps> = ({ playerName, notes }) => {
	return (
		<View className="flex-1 bg-gray-100">
			<View className="bg-teal-600 py-10 px-6  rounded-b-3xl shadow-lg">
				<Text className="text-2xl font-bold text-white">{playerName}</Text>
				<Text className="text-sm text-teal-100">Coach Notes</Text>
			</View>
			<ScrollView className="flex-1 px-4 pt-6">
				{notes.map((note) => (
					<View
						key={note.id}
						className="bg-white rounded-xl shadow-md mb-4 overflow-hidden"
					>
						<View className="bg-teal-50 px-4 py-2 flex-row items-center justify-between">
							<View className="flex-row items-center">
								<Icon name="clipboard-text" size={20} color="#00897B" />
								<Text className="text-teal-700 font-semibold ml-2">
									{note.coachName}
								</Text>
							</View>
							<Text className="text-xs text-gray-500">{note.timestamp}</Text>
						</View>
						<View className="p-4">
							<Text className="text-gray-800 leading-6">{note.content}</Text>
						</View>
						<View className="flex-row justify-end px-4 py-2 bg-gray-50">
							{/* <TouchableOpacity className="mr-4">
								<Icon name="pencil" size={20} color="#00897B" />
							</TouchableOpacity> */}
							{/* <TouchableOpacity>
								<Icon name="trash-can-outline" size={20} color="#EF4444" />
							</TouchableOpacity> */}
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default CoachNotes;
