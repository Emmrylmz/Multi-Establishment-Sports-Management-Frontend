import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './store';

// import { StatusBar } from 'expo-status-bar';

export default function App() {
	return (
		<Provider store={store}>

			<AppNavigator />
			{/* <StatusBar style="light" />  */}
			{/* Both status bars are the same,couldn't decide on using one or the other */}
		</Provider>
	);
}
