import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component

type FormOptionProps = {
	EventType: string;
	isSelected: boolean;
	onSelect: () => void;
};

const FormOption: React.FC<FormOptionProps> = ({
	EventType,
	isSelected,
	onSelect,
}) => {
	return (
		<View className="flex-1 p-2">
			<TouchableOpacity
				onPress={onSelect}
				className={
					isSelected
						? 'bg-dacka-green p-3 rounded-lg flex-row justify-between items-center'
						: 'bg-dacka-gray p-3 rounded-lg flex-row justify-between items-center'
				}
			>
				<Text>{EventType}</Text>
				<Icon
					name={isSelected ? 'check-circle' : 'circle-o'}
					size={20}
					color={isSelected ? 'white' : 'black'}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default FormOption;
