// components/ProfileSidebar.tsx
import React, { useRef, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Animated,
	StyleSheet,
	Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserInfoType } from '../../../features/auth/auth.interface';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;

interface ProfileSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	user: UserInfoType;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
	isOpen,
	onClose,
	user,
}) => {
	const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

	useEffect(() => {
		Animated.timing(slideAnim, {
			toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [isOpen]);

	const menuItems = [
		{ icon: 'account-edit', label: 'Edit Profile' },
		{ icon: 'cog', label: 'Settings' },
		{ icon: 'shield-account', label: 'Privacy' },
		{ icon: 'help-circle', label: 'Help & Support' },
		{ icon: 'logout', label: 'Logout' },
	];

	if (user) {
		return (
			<Animated.View
				style={[
					styles.sidebar,
					{
						transform: [{ translateX: slideAnim }],
					},
				]}
			>
				<View style={styles.header}>
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<Icon name="close" size={24} color="#fff" />
					</TouchableOpacity>
					<View style={styles.userInfo}>
						<View style={styles.avatar}>
							<Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
						</View>
						<Text style={styles.userName}>{user.name}</Text>
					</View>
				</View>
				<View style={styles.menuContainer}>
					{menuItems.map((item, index) => (
						<TouchableOpacity key={index} style={styles.menuItem}>
							<Icon name={item.icon} size={24} color="#00897B" />
							<Text style={styles.menuItemText}>{item.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			</Animated.View>
		);
	}
};

const styles = StyleSheet.create({
	sidebar: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: SIDEBAR_WIDTH,
		backgroundColor: '#fff',
		zIndex: 1000,
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	header: {
		backgroundColor: '#00897B',
		padding: 20,
		paddingTop: 40,
	},
	closeButton: {
		position: 'absolute',
		top: 40,
		right: 20,
		zIndex: 1,
	},
	userInfo: {
		alignItems: 'center',
		marginTop: 20,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	avatarText: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#00897B',
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 5,
	},
	userEmail: {
		fontSize: 14,
		color: '#e0e0e0',
	},
	menuContainer: {
		flex: 1,
		paddingTop: 20,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	menuItemText: {
		marginLeft: 15,
		fontSize: 16,
		color: '#333',
	},
});

export default ProfileSidebar;
