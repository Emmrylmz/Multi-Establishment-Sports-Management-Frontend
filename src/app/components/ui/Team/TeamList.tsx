import React from 'react';
import { FlatList, View, Text } from 'react-native';
import TeamCard from './TeamCard'; // Adjust the import path as needed

type Team = {
	teamName: string;
	teamId: string;
	coachName: string;
};

type TeamListProps = {
	teams: Team[];
	onTeamSelect: (teamId: string) => void;
	selectedTeamId: string | null;
};

const TeamList: React.FC<TeamListProps> = ({
	teams,
	onTeamSelect,
	selectedTeamId,
}) => {
	return (
		<FlatList
			data={teams}
			keyExtractor={(item) => item.teamId}
			renderItem={({ item }) => (
				<TeamCard
					teamName={item.teamName}
					teamId={item.teamId}
					coachName={item.coachName}
					additionalStyles={
						selectedTeamId === item.teamId ? 'border-2 border-teal-600' : ''
					}
					navigation={() => onTeamSelect(item.teamId)}
				/>
			)}
			ListEmptyComponent={
				<View className="flex items-center justify-center p-4">
					<Text className="text-gray-500 text-lg">No teams available</Text>
				</View>
			}
		/>
	);
};

export default TeamList;
