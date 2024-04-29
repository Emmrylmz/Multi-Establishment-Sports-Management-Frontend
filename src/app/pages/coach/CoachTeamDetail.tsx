import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import PlayerCard from '../../components/ui/PlayerCard';
import { ImageSourcePropType } from 'react-native';
import { coachTeamDetailTexts } from '../../../utils/constants/texts';
const CoachTeamDetail = ({ route, navigation }) => {
	type Player = {
		name: string;
		surname: string;
		email: string;
		password: string;
		phone_number: string;
		image: ImageSourcePropType;
		dateOfBirth: string;
	};
	const [team, setTeam] = React.useState<Player[]>([
		{
			name: 'Ahmet',
			surname: 'Köksal',
			email: 'hmetkoksal@gmail.com',
			password: 'ahmetkoksal123',
			phone_number: '+90 (532) 123 45 67',
			image: require('../../../../assets/profile_pic.jpg'),
			dateOfBirth: '12.12.1999',
		},
		{
			name: 'Mehmet',
			surname: 'Köksal',
			email: 'mehmetkoksal@gmail.com',
			password: 'mehmetkoksal123',
			phone_number: '+90 (532) 123 45 67',
			image: require('../../../../assets/profile_pic.jpg'),
			dateOfBirth: '12.12.1999',
		},
		{
			name: 'Ali',
			surname: 'Köksal',
			email: 'alikoksal@gmail.com',
			password: 'alikoksal123',
			phone_number: '+90 (532) 123 45 67',
			image: require('../../../../assets/profile_pic.jpg'),
			dateOfBirth: '12.12.1999',
		},
		{
			name: 'Veli',
			surname: 'Köksal',
			email: 'velikoksal@gmail.com',
			password: 'velikoksal123',
			phone_number: '+90 (532) 123 45 67',
			image: require('../../../../assets/profile_pic.jpg'),
			dateOfBirth: '12.12.1999',
		},
	]);	// This is a dummy data, you can replace it with your data


  type TemporaryPlayer = {
		name: string;
}

const [attendanceList, setAttendanceList] = React.useState<TemporaryPlayer[]>([]);

function addPlayerToAttendanceList(playerName: string) {
	setAttendanceList((prevList) => [...prevList, { name: playerName }]);
}

function checkPlayerInAttendanceList(playerName: string) {
	return attendanceList.some((player) => player.name === playerName);
}

function removePlayerFromAttendanceList(playerName: string) {
	setAttendanceList((prevList) => prevList.filter((player) => player.name !== playerName));
}

	const { team_id } = route.params;
	return (
		<AppLayout>
			{/* <Text className="text-white">CoachTeamDetail</Text>
			<Text className="text-white">team_id: {team_id}</Text> */}
			<ScrollView className="w-full h-[60%]">
				{team.map((player, index) => (
					<PlayerCard
						key={index}
						name={player.name}
						dateOfBirth={player.dateOfBirth}
						image={player.image}
						addUserToAttendanceList={addPlayerToAttendanceList}
						removeUserFromAttendanceList={removePlayerFromAttendanceList}
						isAdded={checkPlayerInAttendanceList(player.name)}
					/>
				))}
			</ScrollView>
			<View className='flex-row items-center justify-end w-full'>
				<TouchableOpacity className='p-4 rounded-3xl bg-dacka-gray' onPress={() => navigation.navigate('CoachAddTrainingPage',{team_id: team_id,attendanceList: attendanceList})}>
					<Text className='text-white'>{coachTeamDetailTexts.continue}</Text>
				</TouchableOpacity>
			</View>
		</AppLayout>
	);
};

export default CoachTeamDetail;
