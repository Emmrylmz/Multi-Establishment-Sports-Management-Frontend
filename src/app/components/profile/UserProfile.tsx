import { View, Text } from 'react-native';
import React from 'react';
import ProfileContainer from './ProfileContainer';
import { useGetUserInfoQuery } from '../../../features/query/userInfoQueryService';
import GoBackButton from '../ui/GoBackButton';
import LoadingIndicator from '../ui/fetch/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import ErrorComponent from '../ui/fetch/ErrorComponent';

const UserProfile = ({ route }) => {
	const { user_id } = route.params;
	const { data: User, isLoading, isError,refetch } = useGetUserInfoQuery(user_id);


	if (isLoading) {
		return <LoadingIndicator isLoading={isLoading} />;
	}

	if (isError) {
		return <ErrorComponent onRetry={refetch} />;
	}

	return (
		<>
			<GoBackButton />
			<ProfileContainer user={User} />
		</>
	);
};

export default UserProfile;
