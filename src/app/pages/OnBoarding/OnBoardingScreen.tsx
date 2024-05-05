import {
	View,
	Text,
	Button,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {} from 'react-native';
import { styled } from 'nativewind';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export interface OnboardingScreenProps {
	navigation: NativeStackNavigationProp<any, any>;
}


Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});
Notifications.getExpoPushTokenAsync({projectId: "expo-react-native-w-tailwind"} )

async function sendPushNotification(expoPushToken: string) {
   
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'Original Title',
		body: 'And here is the body!',
		data: { someData: 'goes here' },
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
}

function handleRegistrationError(errorMessage: string) {
	alert(errorMessage);
	throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    try {
        const res = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log('Expo Push Token:', res.data);  // Token is logged here
        return res.data;
      } catch (error) {
        console.error('Error getting Expo Push Token:', error);
      }
	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			handleRegistrationError(
				'Permission not granted to get push token for push notification!'
			);
			return;
		}
		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ??
			Constants?.easConfig?.projectId;
		if (!projectId) {
			handleRegistrationError('Project ID not found');
		}
		try {
			 const pushTokenString = (await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
              })).data;
			console.log(pushTokenString);
			return pushTokenString;
		} catch (e: unknown) {
			handleRegistrationError(`${e}`);
		}
	} else {
		handleRegistrationError('Must use physical device for push notifications');
	}
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
   
	

	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();

	useEffect(() => {
        
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token ?? 'Error obtaining token')
		);

		registerForPushNotificationsAsync()
			.then((token) => setExpoPushToken(token ?? ''))
			.catch((error: any) => setExpoPushToken(`${error}`));

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	// async function registerForPushNotificationsAsync() {
	//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
	//     let finalStatus = existingStatus;
	//     if (existingStatus !== 'granted') {
	//         const { status } = await Notifications.requestPermissionsAsync();
	//         finalStatus = status;
	//     }

	//     if (finalStatus === 'granted') {
	//         const projectId = Constants.manifest?.extra?.eas?.projectId; // Adjust this based on your configuration
	//         const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
	//         console.log('Expo Push Token:', token);
	//         return token;
	//     } else {
	//         console.error('Permission not granted for push notifications');
	//         throw new Error('Permission not granted for push notifications');
	//     }
	// }

	// const handleFinishOnboarding = async () => {
	//     try {
	//         const token = await registerForPushNotificationsAsync();
	//         console.log('Token received:', token);
	//         // navigation.navigate('HomeScreen');  // Navigate to home after permissions
	//     } catch (error) {
	//         console.error('Error fetching token:', error);
	//     }
	// };

	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
		>
			<Text>Your Expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>
					Title: {notification && notification.request.content.title}{' '}
				</Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>
					Data:{' '}
					{notification && JSON.stringify(notification.request.content.data)}
				</Text>
			</View>
			<Button
				title="Press to Send Notification"
				onPress={async () => {
					await sendPushNotification(expoPushToken);
				}}
			/>
		</View>
	);
};

export default OnboardingScreen;

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
