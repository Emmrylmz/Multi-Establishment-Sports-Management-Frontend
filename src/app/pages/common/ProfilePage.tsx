import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { View } from 'react-native';
import ProfileHeader from '../../components/profileComponents/ProfileHeader';
import AccountInfo from '../../components/profileComponents/AccountInfo';

const ProfilePage: React.FC = () => {
	const user = useSelector((state: RootState) => getAuthUser(state));

	return (
		<View className="flex-1 items-center">
			<ProfileHeader />
			<View className='w-10/12 flex-1'>
				<AccountInfo user={user} />
			</View>
		</View>
	);
};

export default ProfilePage;
