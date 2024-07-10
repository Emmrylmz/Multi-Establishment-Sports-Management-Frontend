import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GoBackButton from '../../components/ui/GoBackButton';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { PlayerCard } from '../../components';

<<<<<<< HEAD
  console.log(teamUsers)
=======
const TeamDetailPage = ({ route, navigation }) => {
	// Assuming we receive the team data through route params
	const {
		team_id,
		team_name,
		team_players,
		team_coaches,
		created_at,
		province,
	} = route.params;
>>>>>>> 076ab3ae04606f798d46db3402aabc6564f52792

	const {
		data: teamUsers,
		isLoading,
		isError,
	} = useGetTeamUsersByIdQuery(team_id);
	console.log(teamUsers);

	const navigateToUserDetail = (user_id) => {
		navigation.navigate('UserProfile', { user_id: user_id });
	};

	const renderMember = (member, role) => (
		<PlayerCard
			id={member._id}
			key={member._id}
			name={member.name}
			image={{
				uri: member.avatarUrl || 'https://avatar.iran.liara.run/public/boy',
			}}
			position={role}
			onPress={() => navigateToUserDetail(member._id)}
			attended={member.attended}
		/>
	);

	return (
		<ScrollView className="flex-1 bg-gray-100">
			<View className="bg-teal-600 pt-12 pb-6 px-4 rounded-b-3xl shadow-md">
				<GoBackButton />
				<View className="items-center mt-8">
					<Image
						source={{
							uri: 'https://upload.wikimedia.org/wikipedia/en/5/55/Darussafaka_basketball_logo.png',
						}}
						className="w-44 h-44 rounded-full mb-4"
					/>
					<Text className="text-3xl font-bold text-white">{team_name}</Text>
					<Text className="text-lg text-teal-100">{province}</Text>
				</View>
			</View>

			<View className="px-4 mt-6">
				<Text className="text-xl font-bold text-gray-800 mb-4">Coaches</Text>
				{teamUsers &&
				teamUsers.coach_infos &&
				teamUsers.coach_infos.length > 0 ? (
					teamUsers.coach_infos.map((coach) => renderMember(coach, 'Coach'))
				) : (
					<Text className="text-gray-500 italic">No coaches added yet.</Text>
				)}
			</View>

			<View className="px-4 mt-6 mb-6">
				<Text className="text-xl font-bold text-gray-800 mb-4">Players</Text>
				{teamUsers &&
				teamUsers.player_infos &&
				teamUsers.player_infos.length > 0 ? (
					teamUsers.player_infos.map((player) =>
						renderMember(player, player.position || 'Player')
					)
				) : (
					<Text className="text-gray-500 italic">No players added yet.</Text>
				)}
			</View>

			<View className="px-4 mb-6">
				<Text className="text-sm text-gray-500">
					Team created on: {new Date(created_at).toLocaleDateString()}
				</Text>
			</View>
		</ScrollView>
	);
};

export default TeamDetailPage;
