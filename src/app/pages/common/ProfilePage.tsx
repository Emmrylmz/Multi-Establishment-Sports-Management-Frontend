import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import ProfileContainer from '../../components/profile/ProfileContainer';
import { useGetUserInfoQuery } from '../../../features/query/userInfoQueryService';
import { Text, View, ActivityIndicator } from 'react-native';
import { ProfileHeader } from '../../components';

const LoadingSpinner = () => {
    return (
        <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#919191" />
            <Text className="mt-2">Loading...</Text>
        </View>
    );
};

const ProfilePage: React.FC = () => {
    const user = useSelector((state: RootState) => getAuthUser(state));
    const { data: UserInfo, isLoading } = useGetUserInfoQuery(user?._id);
    console.log(UserInfo)

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!UserInfo) {
        return <Text>No user information available</Text>;
    }

    return (
        <>
            <ProfileContainer user={UserInfo} />
            {/* <ProfileHeader isProfilePage={true} /> */}
        </>
    );
};

export default ProfilePage;