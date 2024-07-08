import React from 'react';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from './Navbar';
import BackgroundImage from '../ui/BackgroundImage/BackgroundImage';
import { View } from 'react-native';

type AuthLayoutProps = {
	children: React.ReactNode;
};

const AppLayout = ({ children }: AuthLayoutProps) => {
	return (
			<SafeAreaView className="w-full h-full px-5 bg-gray-100 dark:bg-dacka-black">
				{children}
			</SafeAreaView>
	);
};

export default AppLayout;
