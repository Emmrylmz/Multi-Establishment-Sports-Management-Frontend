import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useGetTeamInfoQuery } from '../../../../features/query/teamQueryService';
import TeamSelectionModal from '../Team/TeamSelectionModal';

const QuickActions = ({ user }) => {
	const navigation = useNavigation();
	const [isTeamSelectionModalVisible, setTeamSelectionModalVisible] =
		useState(false);
	const { data: teams = [] } = useGetTeamInfoQuery(user.teams);

	const handleNewPracticePress = () => {
		setTeamSelectionModalVisible(true);
	};

	const handleTeamSelect = (teamId: string) => {
		navigation.navigate('CoachAddTrainingPage', { team_id: teamId });
	};

	const routeEventHistory = () => {
		navigation.navigate('EventHistoryPage');
	};

	return (
		<View className=" mb-6">
			<Text className="text-xl font-bold text-gray-800 mb-4">
				Quick Actions
			</Text>

			<View className="flex-row justify-between">
				<TouchableOpacity
					className="bg-white rounded-xl p-4 items-center w-[30%] shadow-sm"
					onPress={handleNewPracticePress}
				>
					<Ionicons name="basketball" size={24} color="#0D9488" />
					<Text className="text-sm text-center text-gray-600 mt-2">Create Event</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="bg-white rounded-xl p-4 items-center w-[30%] shadow-sm"
					onPress={routeEventHistory}
				>
					<Ionicons name="calendar" size={24} color="#0D9488" />
					<Text className="text-sm text-gray-600 mt-2">Event History</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="bg-white rounded-xl p-4 items-center w-[30%] shadow-sm"
					onPress={handleNewPracticePress}
				>
					<Ionicons name="add-circle" size={30} color="#0D9488" />
					<Text className="text-sm text-gray-600 mt-2">Create Team</Text>
				</TouchableOpacity>
				{/* ... other quick action buttons ... */}
			</View>

			<TeamSelectionModal
				visible={isTeamSelectionModalVisible}
				onClose={() => setTeamSelectionModalVisible(false)}
				teams={teams.map((team) => ({
					teamName: team.name,
					teamId: team._id,
					coachName: team.coach_name || 'Unknown Coach',
				}))}
				onTeamSelect={handleTeamSelect}
			/>
		</View>
	);
};

export default QuickActions;
