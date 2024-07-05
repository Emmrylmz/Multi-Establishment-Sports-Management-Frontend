import React, { useMemo, useCallback } from 'react';
import {
	View,
	Text,
	Alert,
	Platform,
	Linking,
	TouchableOpacity,
	ScrollView,
	Animated,
	Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import AppLayout from '../../components/layout/AppLayout';
import MapView, { Marker } from 'react-native-maps';
import { PlayerCard } from '../../components';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { useFetchAttendancesByEventIdQuery } from '../../../features/query/eventQueryService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure you have
import { LinearGradient } from 'expo-linear-gradient';

const EventDetailPage: React.FC<{ route: any }> = ({ route }) => {
	const {
		event_id,
		team_name,
		event_name,
		place,
		coordinates,
		start_datetime,
		event_type,
		team_id,
	} = route.params;
	const [showMap, setShowMap] = React.useState(false);

	const user = useSelector((state: RootState) => state.auth.user);
	const eventDate = new Date(start_datetime);
	const now = new Date();
	const hasEventPassed = now > eventDate;

	const { data: teamUsers = [] } = useGetTeamUsersByIdQuery(team_id);
	const { data: attendanceData = [] } = useFetchAttendancesByEventIdQuery(
		event_id,
		{
			skip: !hasEventPassed,
		}
	);

	const handleMarkerPress = useCallback(() => {
		const buttons = [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Google Maps', onPress: () => openMaps('google') },
		];

		if (Platform.OS === 'ios') {
			buttons.push({ text: 'Apple Maps', onPress: () => openMaps('apple') });
		}

		Alert.alert('Open Maps', 'Choose an app to open this location:', buttons);
	}, []);

	const openMaps = useCallback(
		(type: string) => {
			const latitude = coordinates.latitude;
			const longitude = coordinates.longitude;
			const label = encodeURIComponent(`${place} - ${event_name}`);
			let url;

			if (type === 'google') {
				url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${latitude},${longitude}`;
			} else if (type === 'apple') {
				url = `maps:0,0?q=${label}@${latitude},${longitude}`;
			}

			if (url) {
				Linking.canOpenURL(url)
					.then((supported) => {
						if (supported) {
							Linking.openURL(url);
						} else {
							console.error("Can't handle URL: " + url);
						}
					})
					.catch((err) => console.error('An error occurred', err));
			} else {
				console.error('Undefined URL for the maps application.');
			}
		},
		[coordinates, place, event_name]
	);

	const NavigateUserDetails = useCallback((user_id: string) => {
		console.log('Navigating to user details:', user_id);
	}, []);

	const mergedData = useMemo(() => {
		if (!attendanceData.length) return teamUsers;
		return teamUsers.map((user) => {
			const attendanceRecord = attendanceData.find(
				(att) => att.user_id === user._id
			);
			return {
				...user,
				attended: attendanceRecord
					? attendanceRecord.status === 'present'
					: false,
			};
		});
	}, [teamUsers, attendanceData]);

	const scrollY = React.useRef(new Animated.Value(0)).current;
	const fadeAnim = React.useRef(new Animated.Value(0)).current;
	const slideAnim = React.useRef(new Animated.Value(50)).current;
	const AnimatedImage = Animated.createAnimatedComponent(Image);

	React.useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.spring(slideAnim, {
				toValue: 0,
				tension: 50,
				friction: 7,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	// ... (keep existing functions)

	return (
		<Animated.ScrollView
			contentContainerStyle={{ backgroundColor: '#f0f2f5' }}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { y: scrollY } } }],
				{ useNativeDriver: true }
			)}
			scrollEventThrottle={16}
		>
			<LinearGradient colors={['#4ca2d5', '#3FA454']} className="flex-1">
				<AnimatedImage
					source={
						event_type === 'Training'
							? require('../../../assets/Basketball-rafiki.png')
							: event_type === 'Game'
								? require('../../../assets/Basketball-bro.png')
								: require('../../../assets/Basketball-bro.png')
					}
					style={{
						width: '100%',
						height: 250,
						transform: [
							{
								translateY: scrollY.interpolate({
									inputRange: [-300, 0, 300],
									outputRange: [-50, 0, 100],
									extrapolate: 'clamp',
								}),
							},
							{
								scale: scrollY.interpolate({
									inputRange: [-300, 0, 300],
									outputRange: [1.2, 1, 0.75],
									extrapolate: 'clamp',
								}),
							},
						],
					}}
				/>
			</LinearGradient>
			<Text
				style={{
					color: '#ffffff',
					fontSize: 24,
					fontWeight: 'bold',
					marginTop: 10,
				}}
			>
				{event_name}
			</Text>

			<Animated.View
				style={{
					opacity: fadeAnim,
					transform: [{ translateY: slideAnim }],
					padding: 20,
					marginTop: -50,
					backgroundColor: 'white',
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: -5,
					},
					shadowOpacity: 0.1,
					shadowRadius: 6,
					elevation: 5,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<Icon
						name="account-group"
						size={24}
						color="#4a90e2"
						style={{ marginRight: 10 }}
					/>
					<Text
						style={{ fontWeight: 'bold', color: '#4a90e2', marginRight: 5 }}
					>
						Team:
					</Text>
					<Text>{team_name}</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<Icon
						name="tag"
						size={24}
						color="#4a90e2"
						style={{ marginRight: 10 }}
					/>
					<Text
						style={{ fontWeight: 'bold', color: '#4a90e2', marginRight: 5 }}
					>
						Event Type:
					</Text>
					<Text>{event_type}</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<Icon
						name="map-marker"
						size={24}
						color="#4a90e2"
						style={{ marginRight: 10 }}
					/>
					<Text
						style={{ fontWeight: 'bold', color: '#4a90e2', marginRight: 5 }}
					>
						Place:
					</Text>
					<Text>{place}</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 20,
					}}
				>
					<Icon
						name="calendar"
						size={24}
						color="#4a90e2"
						style={{ marginRight: 10 }}
					/>
					<Text
						style={{ fontWeight: 'bold', color: '#4a90e2', marginRight: 5 }}
					>
						Date:
					</Text>
					<Text>{eventDate.toDateString()}</Text>
				</View>

				<TouchableOpacity
					style={{
						backgroundColor: '#4a90e2',
						padding: 15,
						borderRadius: 10,
						alignItems: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
					onPress={() => setShowMap((prevState) => !prevState)}
				>
					<Icon
						name={showMap ? 'map-marker-off' : 'map-marker'}
						size={24}
						color="#ffffff"
						style={{ marginRight: 10 }}
					/>
					<Text style={{ color: 'white', fontWeight: 'bold' }}>
						{showMap ? 'Hide map' : 'See location on map'}
					</Text>
				</TouchableOpacity>

				{showMap && (
					<MapView
						style={{ height: 200, marginTop: 20, borderRadius: 10 }}
						initialRegion={{
							latitude: coordinates.latitude,
							longitude: coordinates.longitude,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
					>
						<Marker
							coordinate={coordinates}
							title={place}
							description={`${event_name} at ${team_name}`}
							onPress={handleMarkerPress}
						/>
					</MapView>
				)}
			</Animated.View>

			<View style={{ padding: 20, backgroundColor: 'white', marginTop: 20 }}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						color: '#333',
						marginBottom: 15,
					}}
				>
					{hasEventPassed ? 'Attendance Table' : 'Team Players'}
				</Text>
				{mergedData &&
					mergedData.map((user) => (
						<PlayerCard
							key={user._id}
							name={user.name}
							image={user.image}
							attended={user.attended}
							onPress={() => NavigateUserDetails(user._id)}
						/>
					))}
			</View>
		</Animated.ScrollView>
	);
};

export default EventDetailPage;
