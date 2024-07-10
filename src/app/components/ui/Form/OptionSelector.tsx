import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type OptionSelectorProps = {
	eventType: string;
	onEventTypeChange: (type: string) => void;
};

const OptionSelector: React.FC<OptionSelectorProps> = ({
	eventType,
	onEventTypeChange,
}) => (
	<View className="flex-row justify-between mb-6">
		{['Training', 'Game'].map((type) => (
			<TouchableOpacity
				key={type}
				className={`flex-row items-center bg-gray-200 py-3 px-6 rounded-full flex-1 mx-1 ${eventType === type ? 'bg-teal-600' : ''}`}
				onPress={() => onEventTypeChange(type)}
			>
				<Icon
					name={type === 'Training' ? 'whistle' : 'basketball'}
					size={24}
					color={eventType === type ? '#fff' : '#00897B'}
				/>
				<Text
					className={`ml-2 font-bold ${eventType === type ? 'text-white' : 'text-teal-600'}`}
				>
					{type}
				</Text>
			</TouchableOpacity>
		))}
	</View>
);

export default OptionSelector;
