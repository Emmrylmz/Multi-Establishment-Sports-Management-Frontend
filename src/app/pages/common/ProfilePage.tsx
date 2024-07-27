import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import ProfileContainer from '../../components/profile/ProfileContainer';
import {
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ProfilePage: React.FC = () => {
	const user = useSelector((state: RootState) => getAuthUser(state));

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	return (
		<>
			<TouchableOpacity
				style={styles.menuButton}
				onPress={() => setIsSidebarOpen(true)}
			>
				{isSidebarOpen ? '' : <Icon name="menu" size={24} color="#fff" />}
			</TouchableOpacity>
			<ProfileSidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				user={user}
			/>
			<ProfileContainer user={user} />
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
