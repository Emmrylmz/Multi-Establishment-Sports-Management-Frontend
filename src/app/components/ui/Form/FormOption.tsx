// FormOption.tsx
import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
		<View className="flex-1">
			<TouchableOpacity
				onPress={onSelect}
				className={
					isSelected
						? 'bg-dacka-green p-3 rounded-lg'
						: 'bg-dacka-gray p-3 rounded-lg'
				}
			>
				<View>
					<Text>{EventType}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default FormOption;
