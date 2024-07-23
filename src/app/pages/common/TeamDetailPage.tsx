import React, { memo } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { PlayerCard } from '../../components';

const TeamDetailPage = ({ route, navigation }) => {
	const { t } = useTranslation();
	const {
		from,
		team_id,
		team_name,
		team_players,
		team_coaches,
		created_at,
		province,
		monthlyPaymentAmount,
	} = route.params;

	const {
		data: teamUsers,
		isLoading,
		isError,
	} = useGetTeamUsersByIdQuery(team_id);

	const navigateToUserDetail = (user) => {
		if (from === 'manager') {
			return navigation.navigate('ManagerPaymentStackNavigator', {
				screen: 'PlayerPayments',
				params: {
					player_id: user._id,
					team_id: team_id,
					discount: user.discount,
					monthlyPaymentAmount: monthlyPaymentAmount,
				},
			});
		}
		navigation.navigate('UserProfile', { user_id: user._id });
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
			onPress={() => navigateToUserDetail(member)}
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
					<Text className="text-3xl font-bold text-gray-800 dark:text-gray-200">
						{team_name}
					</Text>
					<Text className="text-lg text-gray-700 dark:text-gray-100">
						{province}
					</Text>
				</View>
			</View>

			<View className="px-4 mt-6">
				<Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-300">
					{t('teamDetailPage.coaches')}
				</Text>
				{isLoading ? (
					<View className="flex items-center justify-center">
						<ActivityIndicator size="large" color="#4CAF50" />
						<Text className="mt-2 text-gray-700 dark:text-gray-200">
							{t('fetchMessages.loading')}
						</Text>
					</View>
				) : teamUsers &&
				  teamUsers.coach_infos &&
				  teamUsers.coach_infos.length > 0 ? (
					teamUsers.coach_infos.map((coach) => renderMember(coach, 'Coach'))
				) : (
					<Text className="italic text-gray-700 dark:text-gray-200">
						{t('fetchMessages.noCoaches')}
					</Text>
				)}
			</View>

			<View className="px-4 mt-6 mb-6">
				<Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-300">
					{t('teamDetailPage.players')}
				</Text>
				{isLoading ? (
					<View className="flex items-center justify-center">
						<ActivityIndicator size="large" color="#4CAF50" />
						<Text className="mt-2 text-gray-700 dark:text-gray-200">
							{t('fetchMessages.loading')}
						</Text>
					</View>
				) : teamUsers &&
				  teamUsers.player_infos &&
				  teamUsers.player_infos.length > 0 ? (
					teamUsers.player_infos.map((player) =>
						renderMember(player, player.position || 'Player')
					)
				) : (
					<Text className="italic text-gray-700 dark:text-gray-200">
						{t('fetchMessages.noPlayers')}
					</Text>
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
