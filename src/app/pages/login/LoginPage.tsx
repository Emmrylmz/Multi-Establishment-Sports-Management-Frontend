import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AuthPayload } from '../../../features/auth/auth.interface';
import useLogin from '../../../hooks/useLogin';
import AppLayout from '../../components/layout/AppLayout';
import InputField from '../../components/ui/Form/InputField';
import { loginPageTexts } from '../../../utils/constants/texts';
import { FontAwesome, Feather } from '@expo/vector-icons';

const LoginPage = () => {
	const { handleSubmit } = useLogin();

	const [formData, setFormData] = useState<AuthPayload>({
		email: '',
		password: '',
	});

	const handleInputChange = (name: string, text: string) => {
		setFormData((prev) => ({
			...prev,
			[name]: text,
		}));
	};

	console.log(formData);

	return (
		<AppLayout>
			<View className="flex-1 justify-center items-center w-full h-full px-4 ">
				<View className="w-full mb-8">
					<Text className="text-2xl font-bold text-center mb-4">
						{loginPageTexts.login}
					</Text>
					<View className="h-14 mb-4">
						<InputField
							placeholder={loginPageTexts.emailPlaceholder}
							placeholderTextColor="light"
							keyboardType="email-address"
							autoCapitalize="none"
							handleInputChange={handleInputChange}
							name="email"
							icon={<FontAwesome name="envelope" size={24} color="#919191" />}
						/>
					</View>

					<View className="h-14">
						<InputField
							placeholder={loginPageTexts.passwordPlaceholder}
							placeholderTextColor="light"
							autoCapitalize="none"
							handleInputChange={handleInputChange}
							name="password"
							secureTextEntry={true}
							icon={<Feather name="lock" size={24} color="#919191" />}
						/>
					</View>

					<View className="mt-5">
						<Text className="my-1 text-center text-blue-600">
							{loginPageTexts.forgotPassword}
						</Text>
						<Text className="my-1 text-center text-blue-600">
							{loginPageTexts.reset}
						</Text>
					</View>
				</View>

				<View className="w-full">
					<TouchableOpacity
						onPress={async () => handleSubmit(formData)}
						className="w-full py-3 my-3 bg-green-500 rounded-3xl"
					>
						<Text className="text-center text-white text-lg">
							{loginPageTexts.login}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</AppLayout>
	);
};

export default LoginPage;
