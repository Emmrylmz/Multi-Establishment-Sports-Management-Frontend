import React from 'react';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from './Navbar';
import BackgroundImage from '../ui/BackgroundImage/BackgroundImage';

type AuthLayoutProps = {
	children: any;
};

const AppLayout = ({ children }: AuthLayoutProps) => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	return (
		<BackgroundImage>
			<SafeAreaView className="w-full h-full px-5 bg-transparent ">
				{children}
			</SafeAreaView>
		</BackgroundImage>
	);
};

export default AppLayout;
