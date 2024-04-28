import { View, Text, Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { RootState } from '../../../../store';

const Navbar = () => {
	const user = useSelector((state: RootState) => getAuthUser(state));

	return (
		<View className="top-5 flex-row items-center justify-between">
			<View className="h-14 w-14 items-center justify-center rounded-full bg-white">
				<FontAwesome name="bell" size={30} color="black" />
			</View>
			{user ? (
				<Image
					className="h-14 w-14 rounded-full"
					source={{ uri: user.photo }}
					resizeMode="cover"
				/>
			) : (
				<FontAwesome name="user-circle" size={24} color="black" />
			)}
		</View>
	);
};

export default Navbar;
