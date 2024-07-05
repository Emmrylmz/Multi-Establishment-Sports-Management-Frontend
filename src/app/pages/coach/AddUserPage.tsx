import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import InputField from '../../components/ui/Form/InputField';
import { addUserPageTexts } from '../../../utils/constants/texts';
import { FontAwesome, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../../components/ui/BackgroundImage/BackgroundImage';

const AddUserPage = () => {
	type AddUserForm = {
		name: string;
		email: string;
		password: string;
		phone: string;
		address: string;
		city: string;
		birthDate: string;
		school: string;
	};

	const [form, setForm] = useState<AddUserForm>({
		name: '',
		email: '',
		password: '',
		phone: '',
		address: '',
		city: '',
		birthDate: '',
		school: '',
	});

	const handleInputChange = (key: string, value: string) => {
		setForm((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const fieldIcons = {
		name: <FontAwesome name="user" size={24} color="#919191" />,
		email: <FontAwesome name="envelope" size={24} color="#919191" />,
		password: <Feather name="lock" size={24} color="#919191" />,
		phone: <FontAwesome name="phone" size={24} color="#919191" />,
		address: <FontAwesome name="home" size={24} color="#919191" />,
		city: <MaterialIcons name="location-city" size={24} color="#919191" />,
		birthDate: <FontAwesome name="birthday-cake" size={24} color="#919191" />,
		school: <Ionicons name="school" size={24} color="#919191" />
	};

	return (
		<AppLayout>
			<View className="items-center justify-center flex-1">
				<View className="w-full overflow-hidden rounded-2xl h-5/6 bg-dacka-dark-gray">
					<BackgroundImage additionalStyles="rounded-2xl">
						<View className="p-4 pt-10">
							<ScrollView 
								contentContainerStyle={{ flexGrow: 1 }}
								style={{ maxHeight: '85%' }} 
								showsVerticalScrollIndicator={false}
								className="shadow-xl"
							>
								{Object.keys(form).map((key) => (
									<View key={key} className="mt-5 h-14">
										<InputField
											name={key}
											placeholder={addUserPageTexts[`${key}Placeholder`]}
											placeholderTextColor="light"
											additionalStyles="border-b border-dacka-gray p-1"
											keyboardType={
												key === 'email'
													? 'email-address'
													: key === 'phone'
													? 'phone-pad'
													: 'default'
											}
											secureTextEntry={key === 'password'}
											handleInputChange={handleInputChange}
											icon={fieldIcons[key as keyof AddUserForm]}
										/>
									</View>
								))}
							</ScrollView>
							<View className="flex-row justify-end mt-4 ">
								<TouchableOpacity className="px-4 py-2 rounded-xl bg-dacka-gray">
									<Text className="text-base text-white">{addUserPageTexts.submitButton}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</BackgroundImage>
				</View>
			</View>
		</AppLayout>
	);
};

export default AddUserPage;