import React, { useRef, memo } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Animated,
	Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserInfoType } from '../../../features/auth/auth.interface';
import HeaderComponent from './HeaderComponent'; // Import the new HeaderComponent
import { ParamListBase, RouteProp } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = SCREEN_HEIGHT * 0.4;

type UserProfilePageProps = {
	route: RouteProp<ParamListBase, 'ProfileContainer'>;
};

const ProfileContainer: React.FC<UserProfilePageProps> = ({ user }) => {
	const scrollY = useRef(new Animated.Value(0)).current;

	const stats = [
		{
			icon: 'calendar-check',
			label: 'Events',
			value: user?.total_training_events || 0,
		},
		{ icon: 'trophy', label: 'Games', value: user?.total_game_events || 0 },
		{ icon: 'account-group', label: 'Team', value: 'All-Stars' },
	];

	const renderStatsCard = () => (
		<View style={styles.card}>
			{stats.map((stat, index) => (
				<View key={index} style={styles.statItem}>
					<Icon name={stat.icon} size={24} color="#4ca2d5" />
					<Text style={styles.statValue}>{stat.value}</Text>
					<Text style={styles.statLabel}>{stat.label}</Text>
				</View>
			))}
		</View>
	);

	const renderInfoCard = (title, data) => (
		<View style={styles.card}>
			<Text style={styles.cardTitle}>{title}</Text>
			{data.map((item, index) => (
				<View key={index} style={styles.infoRow}>
					<Text style={styles.infoLabel}>{item.label}</Text>
					<Text style={styles.infoValue}>{item.value}</Text>
				</View>
			))}
		</View>
	);

	return (
		<View style={styles.container}>
			<Animated.ScrollView
				contentContainerStyle={styles.scrollViewContent}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
			>
				<View style={styles.content}>
					{user && renderStatsCard()}
					{renderInfoCard('Personal Info', [
						{ label: 'Age', value: user?.age },
						{ label: 'Height', value: `${user?.height} cm` },
						{ label: 'Weight', value: `${user?.weight} kg` },
					])}
					{renderInfoCard('Performance', [
						{
							label: 'Training Attendance',
							value: `${user?.training_attendance_ratio || 0}%`,
						},
						{
							label: 'Game Attendance',
							value: `${user?.game_attendance_ratio || 0}%`,
						},
					])}
				</View>
			</Animated.ScrollView>

			<HeaderComponent scrollY={scrollY} user={user} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	scrollViewContent: {
		paddingTop: HEADER_MAX_HEIGHT,
	},
	content: {
		padding: 20,
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: 20,
		marginBottom: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
		color: '#333',
	},
	statItem: {
		alignItems: 'center',
		flex: 1,
	},
	statValue: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 5,
	},
	statLabel: {
		fontSize: 14,
		color: '#9E9E9E',
		marginTop: 2,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	infoLabel: {
		fontSize: 16,
		color: '#9E9E9E',
	},
	infoValue: {
		fontSize: 16,
		fontWeight: '500',
		color: '#00897B',
	},
});

export default memo(ProfileContainer);
