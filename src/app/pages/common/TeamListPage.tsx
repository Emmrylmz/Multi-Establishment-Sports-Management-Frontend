import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import TeamCard from '../../components/ui/Team/TeamCard';
import { useGetTeamInfoQuery } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterInput from '../../components/ui/Input/FilterInput';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

// Define types for the props and state
type Team = {
  _id: string;
  team_name: string;
  team_players: string[];
  team_coaches: string[];
  created_at: string;
  province: string;
};

interface TeamListPageProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}

const TeamListPage: React.FC<TeamListPageProps> = ({ navigation }) => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const { data, isLoading, isError } = useGetTeamInfoQuery(user?.teams);
	const [filterText, setFilterText] = useState('');
  
	const handleFilterChange = useCallback((text: string) => {
	  setFilterText(text);
	}, []);
  
	const filteredTeams = data?.filter((team: Team) =>
	  team.team_name.toLowerCase().includes(filterText.toLowerCase())
	);
  
	if (isLoading) {
	  return (
		<View className="flex-1 justify-center items-center bg-gray-50">
		  <ActivityIndicator size="large" color="#0D9488" />
		</View>
	  );
	}
  
	if (isError || !data) {
	  return (
		<View className="flex-1 justify-center items-center bg-gray-50">
		  <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
		  <Text className="mt-4 text-gray-700 font-semibold">Error loading teams.</Text>
		</View>
	  );
	}
  
	return (
		<View className="flex-1 bg-gray-50">
		  <View className="bg-teal-600 pt-12 pb-5 px-4 rounded-b-3xl shadow-md">
			<Text className="text-2xl font-bold text-gray-800 mb-4">My Teams</Text>
			<FilterInput
			  value={filterText}
			  onChangeText={handleFilterChange}
			  placeholder="Filter teams..."
			/>
		  </View>
		  <ScrollView className="flex-1 px-4 pt-4">
			{filteredTeams && filteredTeams.length > 0 ? (
			  filteredTeams.map((team: Team) => (
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
			  ))
			) : (
			  <View className="flex-1 justify-center items-center py-8">
				<Ionicons name="search-outline" size={48} color="#9CA3AF" />
				<Text className="mt-4 text-gray-500 font-medium">No teams found</Text>
			  </View>
			)}
		  </ScrollView>
		</View>
	);
  };
  
  export default TeamListPage;