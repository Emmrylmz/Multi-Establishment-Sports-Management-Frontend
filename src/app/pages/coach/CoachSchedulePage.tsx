import { View, ScrollView } from 'react-native';
import { AppLayout, InputField, TeamCard } from '../../components';
import { useState } from 'react';

const CoachSchedulePage = ({ navigation }) => {
	type FormData = {
		deneme: string;
	};

	function handleInputChange(text: string, name: string) {
		console.log(text, name);
	}
	const [formData, setFormData] = useState<FormData>({
		deneme: '',
	});

	type Team = {
		id: number;
		name: string;
	};
	type TeamsList = Team[];
	const teams: TeamsList = [
		{ id: 1, name: 'U18 A' },
		{ id: 2, name: 'U18 B' },
		{ id: 3, name: 'U16 A' },
		{ id: 4, name: 'U16 B' },
		{ id: 5, name: 'U14 A' },
		{ id: 6, name: 'U14 B' },
		{ id: 7, name: 'U12 A' },
		{ id: 8, name: 'U12 B' },
	];

	return (
		<AppLayout>
			<View className="w-full h-full">
				<ScrollView className="w-full p-3">
					{teams.map((team, index) => (
						<TeamCard
							teamName={team.name}
							teamId={team.id}
							key={index}
							navigation={() =>
								navigation.navigate('CoachTeamDetail', { team_id: team.id })
							}
						/>
					))}
				</ScrollView>
				<InputField
					placeholder="Deneme"
					placeholderTextColor="light"
					name="test"
					handleInputChange={handleInputChange}
					secureTextEntry={true}
				/>
			</View>
		</AppLayout>
	);
};

export default CoachSchedulePage;
