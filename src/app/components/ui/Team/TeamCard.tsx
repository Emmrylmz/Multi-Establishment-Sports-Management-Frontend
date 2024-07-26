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
			className="flex-row items-center p-2 m-2 bg-white shadow-sm dark:bg-dacka-dark-gray shadow-dacka-green rounded-xl"
			key={teamId}
      onPress={navigation}
		>
			<Image
				source={{
					uri: 'https://upload.wikimedia.org/wikipedia/en/5/55/Darussafaka_basketball_logo.png',
				}}
				className="w-20 h-20 mr-4 rounded-full"
			/>
			<View className="flex-1">
				<Text className="text-lg font-bold text-teal-600 dark:text-teal-200">{teamName}</Text>
				<Text className="mt-1 text-sm text-gray-600 dark:text-gray-200">U12</Text>
			</View>
		</TouchableOpacity>
	);
};

export default TeamCard;
