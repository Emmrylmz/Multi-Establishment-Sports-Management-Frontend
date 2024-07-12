import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
		<View className="mb-6 ">
			<Text className="mb-4 text-xl font-bold text-gray-800">
				Quick Actions
			</Text>

			<ScrollView horizontal={true} className="flex-row">
				{user.role ==='Manager' && 
					<>
						<TouchableOpacity
							className="items-center p-4 mr-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('AddTeamPage')}
						>
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">
								Create Team
							</Text>
							<Ionicons name="add-circle" size={30} color="#0D9488" />
						</TouchableOpacity>
						<TouchableOpacity
							className="items-center p-4 ml-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('AddUserPage')}
						>
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">
								Add New User
							</Text>
							<Ionicons name="add-circle" size={30} color="#0D9488" />
						</TouchableOpacity>
						<TouchableOpacity
							className="items-center p-4 ml-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('SeeIncomesPage')}
						>
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">
								See Incomes
							</Text>
							<Ionicons name="stats-chart" size={30} color="#0D9488" />
						</TouchableOpacity>
					</>
				}

				{user.role === 'Coach' && (
					<>
						<TouchableOpacity
					className="items-center p-4 bg-white shadow-sm rounded-xl"
					onPress={handleNewPracticePress}
				>
					<Ionicons name="basketball" size={24} color="#0D9488" />
					<Text className="mt-2 text-sm text-center text-gray-600">Create Event</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className="items-center p-4 bg-white shadow-sm rounded-xl"
					onPress={routeEventHistory}
				>
					<Ionicons name="calendar" size={24} color="#0D9488" />
					<Text className="mt-2 text-sm text-gray-600">Event History</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="items-center p-4 bg-white shadow-sm rounded-xl"
					onPress={handleNewPracticePress}
				>
					<Ionicons name="add-circle" size={30} color="#0D9488" />
					<Text className="mt-2 text-sm text-gray-600">Create Team</Text>
				</TouchableOpacity>
					</>
				)

			}
			</ScrollView>

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
