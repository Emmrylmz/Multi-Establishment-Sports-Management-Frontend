import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/auth.slice'
const IconBar: React.FC = () => {

	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout())
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

			<TouchableOpacity className="h-10 w-10  items-center justify-center" onPress={handleLogout}>
				<FontAwesome name="sign-out" size={24} opacity={0.5} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default IconBar;
