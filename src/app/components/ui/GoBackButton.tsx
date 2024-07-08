import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GoBackButton = ({ color = 'white', size = 24, style = {} }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			className="absolute top-12 left-4 z-50"
			style={style}
			onPress={() => navigation.goBack()}
		>
			<Ionicons name="arrow-back" size={size} color={color} />
		</TouchableOpacity>
	);
};

export default GoBackButton;
