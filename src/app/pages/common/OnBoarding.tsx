import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {} from 'react-native';
import { usePushNotification }   from "../../../hooks/usePushNotification"
import { usePushTokenMutation } from '../../../features/query/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OnboardingScreenProps {
	navigation: NativeStackNavigationProp<any, any>;
}

const OnBoarding: React.FC<OnboardingScreenProps> = ({ navigation }) => {
	const { expoPushToken, notification } = usePushNotification();
	const data = JSON.stringify(notification, undefined, 2);
    const [pushToken, { isLoading, isError, isSuccess }] = usePushTokenMutation();

	const handleSubmit = async () => {
		try{

			const res = await pushToken(expoPushToken?.data)
			console.log(res)
		}
		catch(error){
			console.error(error)
		}
	}
	
	return (
		<View style={styles.container}>
			<Text>Token: {expoPushToken?.data ?? ''}</Text>
			<Text>Notification: {data}</Text>
			<Button title='submit' onPress={handleSubmit}/> 
		</View>
	);

}

export default OnBoarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	description: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 20,
	},
});

// import { StatusBar } from 'expo-status-bar';