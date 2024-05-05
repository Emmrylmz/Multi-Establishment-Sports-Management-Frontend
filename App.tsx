import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { styled } from 'nativewind';
import AppNavigator from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './store';

// import { StatusBar } from 'expo-status-bar';


export default function App() {
	return (
		<Provider store={store}>

			<AppNavigator />
			{/* <StatusBar style="light" /> //this comes from expo */}
			<StatusBar barStyle="light-content" />{/* this comes from react-native */}
			{/* Both status bars are the same,couldn't decide on using one or the other */}
		</Provider>
	);
}
