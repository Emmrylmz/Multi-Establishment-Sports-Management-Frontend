import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthPayload } from '../../../features/auth/auth.interface';
import useLogin from '../../../hooks/useLogin';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../../../features/auth/auth.slice';
import AppLayout from '../../components/AppLayout';
import InputField from '../../components/InputField';

const LoginPage = () => {
	const { handleSubmit } = useLogin();
    const user = useSelector(getAuthUser)

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
					<InputField placeholder='email' placeholderTextColor='light' keyboardType='email-address' autoCapitalize='none' handleInputChange={handleInputChange} name='email' />

					<InputField placeholder='password' placeholderTextColor='light' autoCapitalize='none' handleInputChange={handleInputChange} name='password' secureTextEntry={true} />

					<View className='mt-5'>
						<Text className='my-1 text-center text-white'>Forgot password?</Text>
						<Text className='my-1 text-center text-white'>Reset</Text>
					</View>
				</View>

				<View className='w-full'>
					<TouchableOpacity
						onPress={async () => handleSubmit(formData)}
						className="w-full py-3 my-3 opacity-100 bg-dacka-green rounded-3xl"
					>
						<Text className='text-center'>Gir</Text>
					</TouchableOpacity>
				</View>
			</View>
		</AppLayout>
	);
};

export default LoginPage;
