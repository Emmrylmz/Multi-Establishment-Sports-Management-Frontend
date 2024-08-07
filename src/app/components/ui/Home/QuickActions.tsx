import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useGetTeamInfoQuery } from '../../../../features/query/teamQueryService';
import TeamSelectionModal from '../Team/TeamSelectionModal';

const QuickActions = ({ user }) => {
	const { t } = useTranslation();
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
		navigation.navigate('EventHistory');
	};

	return (
		<View className="mb-6 ">
			<Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
				{t("quickActions.title")}
			</Text>

			<ScrollView horizontal={true} className="flex-row" showsHorizontalScrollIndicator={false}>
				{user.role ==='Manager' && 
					<>
						<TouchableOpacity
							className="items-center p-4 mr-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('AddTeamPage')}
						>
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">
								{t("quickActions.createTeam")}
							</Text>
							<Ionicons name="add-circle" size={30} color="#0D9488" />
						</TouchableOpacity>

						<TouchableOpacity
							className="items-center p-4 ml-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('AddUserPage')}
						>
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">
								{t("quickActions.createUser")}
							</Text>
							<Ionicons name="add-circle" size={30} color="#0D9488" />
						</TouchableOpacity>
						<TouchableOpacity
							className="items-center p-4 ml-2 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('SeeIncomesPage')}
						>
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">
								{t("quickActions.seeIncomes")}
							</Text>
							<Ionicons name="stats-chart" size={30} color="#0D9488" />
						</TouchableOpacity>
					</>
				}

				{user.role === 'Coach' && (
					<>
						<TouchableOpacity
							className="items-center p-4 mx-1 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={handleNewPracticePress}
						>
							<Ionicons name="basketball" size={30} color="#0D9488" />
							<Text className="mt-2 text-sm text-center text-gray-600 dark:text-gray-100">{t("quickActions.createEvent")}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="items-center p-4 mx-1 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={routeEventHistory}
						>
							<Ionicons name="calendar" size={30} color="#0D9488" />
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">{t("quickActions.eventHistory")}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className="items-center p-4 mx-1 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('CoachPtPage')}
						>
							<Ionicons name="basketball" size={30} color="#0D9488" />
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">{t("quickActions.ptRequests")}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className="items-center p-4 mx-1 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
							onPress={() => navigation.navigate('CreateTeamPage')}
						>
							<Ionicons name="add-circle" size={30} color="#0D9488" />
							<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">{t("quickActions.createTeam")}</Text>
						</TouchableOpacity>
					</>
				)
			}

			{user.role === 'Player' && (
				<>
					<TouchableOpacity
						className="items-center p-4 mx-1 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
						onPress={() => navigation.navigate('PlayerPtPage')}
					>
						<Ionicons name="basketball" size={30} color="#0D9488" />
						<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">{t("quickActions.ptRequests")}</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="items-center p-4 mx-1 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl"
						onPress={() => navigation.navigate('PlayerTeamPage')}
					>
						<Ionicons name="basketball" size={30} color="#0D9488" />
						<Text className="mt-2 text-sm text-gray-600 dark:text-gray-100">{t('quickActions.seeYourTeams')}</Text>
					</TouchableOpacity>
				</>
			)}
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
