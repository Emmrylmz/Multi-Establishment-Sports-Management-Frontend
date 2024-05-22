import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

type ProfileTextFieldsProps = {
	label: string;
	value: string | undefined;
	editable?: boolean | undefined;
	isPassword?: boolean | undefined;
	handleChangeText?: (text: string, field: string) => void | undefined;
};

const ProfileTextFields = ({
	label,
	value,
	editable,
	isPassword,
	handleChangeText,
}: ProfileTextFieldsProps) => {
	const [isEditable, setIsEditable] = React.useState<boolean>(false);
	if (editable) {
		return (
			<View className="w-full my-3">
				<Text className="text-base text-dacka-gray">{label}</Text>
				<View className="flex-row items-center justify-between w-10/12">
					<TextInput
						value={value}
						className="text-base text-white"
						onChangeText={(text) =>
							handleChangeText && handleChangeText(text, label)
						}
						secureTextEntry={isPassword ? true : false}
						editable={isEditable}
					/>
					<TouchableOpacity
						onPress={() => setIsEditable((prevState) => !prevState)}
					>
						<Feather name="edit-2" size={22} color="#919191" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	return (
		<View className="w-full my-3">
			<Text className="text-base text-dacka-gray">{label}</Text>
			<Text className="text-base text-white">{value}</Text>
		</View>
	);
};

export default ProfileTextFields;
