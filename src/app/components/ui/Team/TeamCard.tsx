import { TouchableOpacity, Text, View, Image } from 'react-native';
import React from 'react';

type TeamCardProps = {
	teamName: string;
	teamId: string;
	coachName: string;
	additionalStyles?: string;
	navigation?: () => void;
};

const TeamCard = ({
	teamName,
	teamId,
	additionalStyles,
	navigation,
}: TeamCardProps) => {
	
	return (
		<TouchableOpacity
			className="flex-row bg-white rounded-xl p-2 m-2 items-center shadow-md"
			key={teamId}
      onPress={navigation}
		>
			<Image
				source={{
					uri: 'https://upload.wikimedia.org/wikipedia/en/5/55/Darussafaka_basketball_logo.png',
				}}
				className="w-20 h-20 rounded-full mr-4"
			/>
			<View className="flex-1">
				<Text className="text-lg font-bold text-teal-600">{teamName}</Text>
				<Text className="text-sm text-gray-600 mt-1">U12</Text>
			</View>
		</TouchableOpacity>
	);
};

export default TeamCard;
