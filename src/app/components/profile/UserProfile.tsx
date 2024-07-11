import { View, Text } from 'react-native';
import React from 'react';
import ProfileContainer from './ProfileContainer';
import { useGetUserInfoQuery } from '../../../features/query/userInfoQueryService';
import GoBackButton from '../ui/GoBackButton';

const UserProfile = ({ route }) => {
	const { user_id } = route.params;
	const { data: User, isLoading, isError } = useGetUserInfoQuery(user_id);


	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>Error loading user data.</Text>;
	}

	return (
		<>
			<GoBackButton />
			<ProfileContainer user={User} />
		</>
	);
};

export default UserProfile;
