import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import ProfileContainer from '../../components/profile/ProfileContainer';
import { useGetUserInfoQuery } from '../../../features/query/userInfoQueryService';
import { Text, View } from 'react-native';
import { ProfileHeader } from '../../components';

const ProfilePage: React.FC = () => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const { data: UserInfo, isLoading } = useGetUserInfoQuery(user?._id);

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (!UserInfo) {
		return <Text>No user information available</Text>;
	}

	return (
		<>
			<ProfileContainer user={UserInfo} />
		</>
	);
};

export default ProfilePage;
