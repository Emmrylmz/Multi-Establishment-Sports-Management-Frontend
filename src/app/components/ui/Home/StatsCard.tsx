import React from 'react';
import { View, Text } from 'react-native';

const StatsOverview = ({ user }) => (
	<View className="flex-row justify-around bg-white rounded-xl mb-6  p-4 shadow-sm">
		<View className="items-center">
			<Text className="text-2xl font-bold text-teal-600">
				{user?.teams.length}
			</Text>
			<Text className="text-sm text-gray-500">Teams</Text>
		</View>
		<View className="items-center">
			<Text className="text-2xl font-bold text-teal-600">8-2</Text>
			<Text className="text-sm text-gray-500">Record</Text>
		</View>
		<View className="items-center">
			<Text className="text-2xl font-bold text-teal-600">3</Text>
			<Text className="text-sm text-gray-500">Next Game</Text>
		</View>
	</View>
);

export default StatsOverview;
