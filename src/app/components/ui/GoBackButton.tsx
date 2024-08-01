import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const GoBackButton = ({size = 24, style = {} }) => {
	const navigation = useNavigation();
	const isDark = useColorScheme() === 'dark';

	return (
		<TouchableOpacity
			className="absolute z-50 top-12 left-4"
			style={style}
			onPress={() => navigation.goBack()}
		>
			<Ionicons name="arrow-back" size={size} color={isDark ? 'white' : 'black'} />
		</TouchableOpacity>
	);
};

export default GoBackButton;
