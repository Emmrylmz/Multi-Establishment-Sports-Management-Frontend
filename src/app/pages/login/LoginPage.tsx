import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthPayload } from '../../../features/auth/auth.interface';
import useLogin from '../../../hooks/useLogin';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../../../features/auth/auth.slice';

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
		<View className="flex-1 justify-center items-center">
			<TextInput
				placeholder="email"
				onChangeText={(text) => handleInputChange(text, 'email')}
			/>
			<TextInput
				placeholder="password"
				onChangeText={(text) => handleInputChange(text, 'password')}
			/>
			<TouchableOpacity
				onPress={async () => handleSubmit(formData)}
				className="my-3 w-full rounded-3xl bg-red-500  py-3 opacity-100"
			><Text className='text-center'>Gir</Text></TouchableOpacity>
		</View>
	);
};

export default LoginPage;
