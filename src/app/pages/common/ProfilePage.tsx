import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import ProfileContainer from '../../components/profile/ProfileContainer';
import { useGetUserInfoQuery } from '../../../features/query/userInfoQueryService';
import {
	Text,
	View,
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { ProfileHeader } from '../../components';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// if (isLoading) {
	//     return <LoadingSpinner />;
	// }

	// if (!UserInfo) {
	//     return <Text>No user information available</Text>;
	// }

	return (
		<>
			<TouchableOpacity
				style={styles.menuButton}
				onPress={() => setIsSidebarOpen(true)}
			>
				<Icon name="menu" size={24} color="#fff" />
			</TouchableOpacity>
			<ProfileSidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				user={UserInfo}
			/>
			<ProfileContainer user={UserInfo} />
			{/* <ProfileHeader isProfilePage={true} /> */}
		</>
	);
};

export default ProfilePage;

const styles = StyleSheet.create({
	menuButton: {
		position: 'absolute',
		top: 40,
		left: 20,
		zIndex: 1001,
	},
});
