import React from 'react';
import { View, Text } from 'react-native';

const StatsOverview = ({ user }) => (
	<View className="flex-row justify-around p-4 mb-6 bg-white shadow-sm dark:bg-dacka-dark-gray rounded-xl">
		<View className="items-center">
			<Text className="text-2xl font-bold text-teal-600">
				{user?.teams.length}
			</Text>
			<Text className="text-sm text-gray-500 dark:text-gray-50">Teams</Text>
		</View>
		<View className="items-center">
			<Text className="text-2xl font-bold text-teal-600">8-2</Text>
			<Text className="text-sm text-gray-500 dark:text-gray-50">Record</Text>
		</View>
		<View className="items-center">
			<Text className="text-2xl font-bold text-teal-600">3</Text>
			<Text className="text-sm text-gray-500 dark:text-gray-50">Next Game</Text>
		</View>
	</View>
);

export default StatsOverview;
