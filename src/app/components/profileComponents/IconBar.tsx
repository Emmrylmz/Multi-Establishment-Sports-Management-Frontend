import { View, TouchableOpacity,Text} from 'react-native';
import React from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useLogoutMutation } from '../../../features/query/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IconBarProps = {
	children: React.ReactNode;
};

const IconBar = ({children}: IconBarProps) => {
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
		// <View className="flex-row gap-2 ">
		// 	<View className="items-center justify-center w-10 h-10">
		// 		<FontAwesome
		// 			name="pencil-square"
		// 			size={24}
		// 			opacity={0.5}
		// 			color="white"
		// 		/>
		// 	</View>
		// 	<View className="items-center justify-center w-10 h-10">
		// 		<MaterialIcons name="settings" size={24} opacity={0.5} color="white" />
		// 	</View>

		// 	<TouchableOpacity
		// 		className="items-center justify-center w-10 h-10"
		// 		onPress={handleLogout}
		// 	>
		// 		<FontAwesome name="sign-out" size={24} opacity={0.5} color="white" />
		// 	</TouchableOpacity>
		// </View>
		<View>
			{children}
		</View>
	);
};

export default IconBar;
