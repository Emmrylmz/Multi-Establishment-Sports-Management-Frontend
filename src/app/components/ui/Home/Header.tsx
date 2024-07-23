import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const Header = ({ user, navigation }) => {
	const { t } = useTranslation();
	const handleNavigateCoachNotes = () => {
		navigation.navigate('CoachNotesPage');
	};

	return (
		<View className="px-4 pt-12 pb-6 bg-white shadow-md dark:bg-dacka-black rounded-b-3xl">
			<View className="flex-row items-center justify-between">
				<Image
					source={{
						uri:
							user?.avatarUrl ||
							'https://avatar.iran.liara.run/public/boy?username=Ash',
					}}
					className="w-16 h-16 mr-4 rounded-full"
				/>
				<View className="flex-1">
					<Text className="text-sm text-gray-500 dark:text-gray-100">{t("header.welcome")},</Text>
					<Text className="text-2xl font-bold text-gray-800 dark:text-gray-300">
						{user?.name || 'Coach'}
					</Text>
				</View>
				<TouchableOpacity
					className="p-3 bg-teal-100 rounded-full"
					onPress={handleNavigateCoachNotes}
				>
					<Ionicons name="notifications" size={24} color="#0D9488" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
