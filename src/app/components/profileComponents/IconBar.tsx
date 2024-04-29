import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useLogoutMutation } from '../../../features/query/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IconBar: React.FC = () => {
	const [logout] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			const response = await logout({}).unwrap();
			console.log(response);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<View className="flex-row gap-2 ">
			<View className="h-10 w-10 items-center justify-center">
				<FontAwesome
					name="pencil-square"
					size={24}
					opacity={0.5}
					color="black"
				/>
			</View>
			<View className="h-10 w-10  items-center justify-center">
				<MaterialIcons name="settings" size={24} opacity={0.5} color="black" />
			</View>

			<TouchableOpacity
				className="h-10 w-10  items-center justify-center"
				onPress={handleLogout}
			>
				<FontAwesome name="sign-out" size={24} opacity={0.5} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default IconBar;
