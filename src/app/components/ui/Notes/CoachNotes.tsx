// components/CoachNotes.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

type Note = {
	id: string;
	content: string;
	timestamp: string;
	coachName: string;
}

type CoachNotesProps = {
	playerName: string;
	notes: Note[];
}

const CoachNotes: React.FC<CoachNotesProps> = ({ playerName, notes }) => {
	const { t } = useTranslation();
	return (
		<View className="flex-1 bg-gray-100">
			<View className="px-6 py-4 bg-teal-600 shadow-lg rounded-b-3xl">
				<Text className="text-2xl font-bold text-white">{playerName}</Text>
				<Text className="text-sm text-teal-100">{t("coachNotes.title")}</Text>
			</View>
			<ScrollView className="flex-1 px-4 pt-6">
				{notes.map((note) => (
					<View
						key={note.id}
						className="mb-4 overflow-hidden bg-white shadow-md rounded-xl"
					>
						<View className="flex-row items-center justify-between px-4 py-2 bg-teal-50">
							<View className="flex-row items-center">
								<Icon name="clipboard-text" size={20} color="#00897B" />
								<Text className="ml-2 font-semibold text-teal-700">
									{note.coachName}
								</Text>
							</View>
							<Text className="text-xs text-gray-500">{note.timestamp}</Text>
						</View>
						<View className="p-4">
							<Text className="leading-6 text-gray-800">{note.content}</Text>
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
