import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { styled } from 'nativewind';
import AppNavigator from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
