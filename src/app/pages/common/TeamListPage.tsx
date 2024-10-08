import React from 'react';
import { View, ScrollView, Text, StatusBar, useColorScheme } from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import TeamCard from '../../components/ui/Team/TeamCard';
import { useGetTeamInfoQuery } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../../components/ui/fetch/LoadingIndicator';
import NoTeamsComponent from '../../components/ui/fetch/NoTeamsComponent';

// Define types for the props and state
type Team = {
  _id: string;
  team_name: string;
  team_players: string[];
  team_coaches: string[];
  created_at: string;
  province: string;
};

type TeamListPageProps = {
	navigation: NativeStackNavigationProp<ParamListBase>;
}

const TeamListPage: React.FC<TeamListPageProps> = ({ navigation }) => {
	const isDark = useColorScheme() === 'dark';
	const user = useSelector((state: RootState) => getAuthUser(state));
	const { data, isLoading, isError } = useGetTeamInfoQuery(user?.teams);

	if (isLoading) {
		return <LoadingIndicator isLoading={isLoading} />;
	}

	if (isError || !data) {
		return  <NoTeamsComponent />;
	}

	return (
		<AppLayout>
			<StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
			<SafeAreaView className="w-full h-full ">
				<ScrollView className="w-full">
					{data &&
						data.map((team: Team) => (
							<TeamCard
								key={team._id}
								teamName={team.team_name}
								teamId={team._id}
								coachName="Ahmet Köksal"
								navigation={() =>
									navigation.navigate('TeamDetailPage', {
										team_id: team._id,
										team_name: team.team_name,
										team_players: team.team_players,
										team_coaches: team.team_coaches,
										created_at: team.created_at,
										province: team.province,
									})
								}
							/>
						))}
				</ScrollView>
			</SafeAreaView>
		</AppLayout>
	);
};

export default TeamListPage;
