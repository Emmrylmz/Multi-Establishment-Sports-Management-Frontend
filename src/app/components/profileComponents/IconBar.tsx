import { View, Text } from 'react-native';
import React from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const IconBar: React.FC = () => {
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

			<View className="h-10 w-10  items-center justify-center ">
				<FontAwesome name="sign-out" size={24} opacity={0.5} color="black" />
			</View>
		</View>
	);
};

export default IconBar;
