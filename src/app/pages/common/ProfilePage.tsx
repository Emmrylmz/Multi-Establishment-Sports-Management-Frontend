import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { View } from 'react-native';
import ProfileHeader from '../../components/profileComponents/ProfileHeader';
import AccountInfo from '../../components/profileComponents/AccountInfo';
import AppLayout from '../../components/layout/AppLayout';

const ProfilePage: React.FC = () => {
	const user = useSelector((state: RootState) => getAuthUser(state));

	return (
		<AppLayout>
			<ProfileHeader />
			<View className='flex-1 w-10/12'>
				<AccountInfo user={user} />
			</View>
		</AppLayout>
	);
};

export default ProfilePage;
