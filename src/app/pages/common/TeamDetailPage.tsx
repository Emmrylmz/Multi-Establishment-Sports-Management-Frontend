import React, { memo } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GoBackButton from '../../components/ui/GoBackButton';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { PlayerCard } from '../../components';

const TeamDetailPage = ({ route, navigation }) => {
	// Assuming we receive the team data through route params
	const {from} =route.params;
	const {
		team_id,
		team_name,
		team_players,
		team_coaches,
		created_at,
		province,
	} = route.params;

	const {
		data: teamUsers,
		isLoading,
		isError,
	} = useGetTeamUsersByIdQuery(team_id);

	const navigateToUserDetail = (user_id) => {
		if(from ==='manager'){
			return navigation.navigate('ManagerPlayerPaymentDetailPage', { player_id: user_id,team_id: team_id })
		}
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
		<ScrollView className="flex-1 bg-gray-100 dark:bg-dacka-black">
			<View className="px-4 pt-12 pb-6 bg-teal-300 shadow-md dark:bg-teal-600 rounded-b-3xl">
				<View className="items-center mt-8">
					<Image
						source={{
							uri: 'https://upload.wikimedia.org/wikipedia/en/5/55/Darussafaka_basketball_logo.png',
						}}
						className="mb-4 rounded-full w-44 h-44"
					/>
					<Text className="text-3xl font-bold text-gray-800 dark:text-gray-200">{team_name}</Text>
					<Text className="text-lg text-gray-700 dark:text-gray-100">{province}</Text>
				</View>
			</View>

			<View className="px-4 mt-6">
				<Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-300">Coaches</Text>
				{teamUsers &&
				teamUsers.coach_infos &&
				teamUsers.coach_infos.length > 0 ? (
					teamUsers.coach_infos.map((coach) => renderMember(coach, 'Coach'))
				) : (
					<Text className="italic text-gray-700 dark:text-gray-200">No coaches added yet.</Text>
				)}
			</View>

			<View className="px-4 mt-6 mb-6">
				<Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-300">Players</Text>
				{teamUsers &&
				teamUsers.player_infos &&
				teamUsers.player_infos.length > 0 ? (
					teamUsers.player_infos.map((player) =>
						renderMember(player, player.position || 'Player')
					)
				) : (
					<Text className="italic text-gray-700 dark:text-gray-200">No players added yet.</Text>
				)}
			</View>

			<View className="px-4 mb-6">
				<Text className="text-sm text-gray-800 dark:text-gray-300">
					Team created on: {new Date(created_at).toLocaleDateString()}
				</Text>
			</View>
		</ScrollView>
	);
};

export default memo(TeamDetailPage);
