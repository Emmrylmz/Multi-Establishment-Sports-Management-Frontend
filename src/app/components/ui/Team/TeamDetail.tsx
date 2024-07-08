import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GoBackButton from '../GoBackButton';

const TeamDetailPage = ({ route, navigation }) => {
	// Assuming we receive the team data through route params
	const { team } = route.params;

	const teamData = {
		_id: '66800f9cc5e4ed61fc5fba2f',
		team_name: 'Warriors',
		team_players: [
			{ _id: 'p1', name: 'John Doe', position: 'Forward' },
			{ _id: 'p2', name: 'Jane Smith', position: 'Guard' },
			// ... more players
		],
		team_coaches: [], // This array is empty as per your schema
		created_at: '2024-06-29T13:43:56.853+00:00',
		province: 'Izmir',
	};
	const renderMember = (member, role) => (
		<View
			key={member._id}
			className="flex-row items-center bg-white p-4 rounded-lg mb-2 shadow-sm"
		>
			<Image
				source={{
					uri: member.avatarUrl || 'https://avatar.iran.liara.run/public/boy',
				}}
				className="w-12 h-12 rounded-full mr-4"
			/>
			<View className="flex-1">
				<Text className="text-lg font-semibold text-gray-800">asd</Text>
				<Text className="text-sm text-gray-500">{role}</Text>
			</View>
			<TouchableOpacity className="bg-teal-100 rounded-full p-2">
				<Ionicons name="chevron-forward" size={24} color="#0D9488" />
			</TouchableOpacity>
		</View>
	);

	return (
		<ScrollView className="flex-1 bg-gray-100">
			<View className="bg-teal-600 pt-12 pb-6 px-4 rounded-b-3xl shadow-md">
				<GoBackButton />
				<View className="items-center mt-8">
					<Image
						source={{
							uri: 'https://upload.wikimedia.org/wikipedia/en/5/55/Darussafaka_basketball_logo.png',
						}} // Replace with actual team logo if available
						className="w-44 h-44 rounded-full mb-4"
					/>
					<Text className="text-3xl font-bold text-white">asd</Text>
					<Text className="text-lg text-teal-100"></Text>
				</View>
			</View>

			<View className="px-4 mt-6">
				<Text className="text-xl font-bold text-gray-800 mb-4">Coaches</Text>
				{teamData.team_coaches && teamData.team_coaches.length > 0 ? (
					teamData.team_coaches.map((coach) => renderMember(coach, 'Coach'))
				) : (
					<Text className="text-gray-500 italic">No coaches added yet.</Text>
				)}
			</View>

			<View className="px-4 mt-6 mb-6">
				<Text className="text-xl font-bold text-gray-800 mb-4">Players</Text>
				{teamData.team_players && teamData.team_players.length > 0 ? (
					teamData.team_players.map((player) =>
						renderMember(player, player.position || 'Player')
					)
				) : (
					<Text className="text-gray-500 italic">No players added yet.</Text>
				)}
			</View>

			<View className="px-4 mb-6">
				<Text className="text-sm text-gray-500">
					Team created on: {new Date(teamData.created_at).toLocaleDateString()}
				</Text>
			</View>
		</ScrollView>
	);
};

export default TeamDetailPage;
