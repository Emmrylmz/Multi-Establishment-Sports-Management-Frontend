import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ user }) => (
	<View className="bg-white pt-12 pb-6 px-4 rounded-b-3xl shadow-md">
		<View className="flex-row items-center justify-between">
			<Image
				source={{
					uri:
						user?.avatarUrl ||
						'https://avatar.iran.liara.run/public/boy?username=Ash',
				}}
				className="w-16 h-16 rounded-full mr-4"
			/>
			<View className="flex-1">
				<Text className="text-sm text-gray-500">Welcome back,</Text>
				<Text className="text-2xl font-bold text-gray-800">
					{user?.name || 'Coach'}
				</Text>
			</View>
			<TouchableOpacity className="bg-teal-100 rounded-full p-3">
				<Ionicons name="notifications" size={24} color="#0D9488" />
			</TouchableOpacity>
		</View>
	</View>
);

export default Header;
