import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AuthPayload } from '../../../features/auth/auth.interface';
import useLogin from '../../../hooks/useLogin';
import AppLayout from '../../components/layout/AppLayout';
import InputField from '../../components/ui/InputField';
import { loginPageTexts } from '../../../utils/constants/texts';

const LoginPage = () => {
	const { handleSubmit } = useLogin();

	const [formData, setFormData] = useState<AuthPayload>({
		email: '',
		password: '',
	});
	function handleInputChange(text: string, name: string) {
		setFormData((prev) => ({
			...prev,
			[name]: text,
		}));
	}
   

	return (
		<AppLayout>
			<View className='items-center justify-between flex-1 w-full h-full'>
				<View></View>

				<View className='w-full'>
					<InputField placeholder={loginPageTexts.emailPlaceholder} placeholderTextColor='light' keyboardType='email-address' autoCapitalize='none' handleInputChange={handleInputChange} name='email' />

					<InputField placeholder={loginPageTexts.passwordPlaceholder} placeholderTextColor='light' autoCapitalize='none' handleInputChange={handleInputChange} name='password' secureTextEntry={true} />

					<View className='mt-5'>
						<Text className='my-1 text-center text-white'>{loginPageTexts.forgotPassword}</Text>
						<Text className='my-1 text-center text-white'>{loginPageTexts.reset}</Text>
					</View>
				</View>

				<View className='w-full'>
					<TouchableOpacity
						onPress={async () => handleSubmit(formData)}
						className="w-full py-3 my-3 opacity-100 bg-dacka-green rounded-3xl"
					>
						<Text className='text-center'>{loginPageTexts.login}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</AppLayout>
	);
};

export default LoginPage;
