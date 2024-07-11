import React, { useState, useRef, useCallback, useMemo, memo } from 'react';
import {
	View,
	Text,
	Alert,
	Platform,
	Linking,
	Animated,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { useFetchAttendancesByEventIdQuery } from '../../../features/query/eventQueryService';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';
import EventDetailsSection from '../../components/ui/Event/EventDetailsSection';
import MapSection from '../../components/ui/Event/MapSection';
import GoBackButton from '../../components/ui/GoBackButton';
import { PlayerCard } from '../../components';
import SubmitButton from '../../components/ui/Form/SubmitButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const EventDetailPage = ({ route, navigation }) => {
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
	const [showMap, setShowMap] = useState(false);
	const user = useSelector((state: RootState) => state.auth.user);
	const eventDate = new Date(start_datetime);
	const now = new Date();
	const hasEventPassed = now > eventDate;

	const {
		data: teamUsers = {},
		isLoading: isTeamUsersLoading,
		isError: isTeamUsersError,
	} = useGetTeamUsersByIdQuery(team_id);
	const {
		data: attendanceData = [],
		isLoading: isAttendanceLoading,
		isError: isAttendanceError,
	} = useFetchAttendancesByEventIdQuery(event_id, { skip: !hasEventPassed });

	const scrollY = useRef(new Animated.Value(0)).current;
	const headerHeight = SCREEN_HEIGHT * 0.4;

	const handleMarkerPress = useCallback(() => {
		const buttons = [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Google Maps', onPress: () => openMaps('google') },
		];

		if (Platform.OS === 'ios') {
			buttons.push({ text: 'Apple Maps', onPress: () => openMaps('apple') });
		}

		Alert.alert('Open Maps', 'Choose an app to open this location:', buttons);
	}, [coordinates, place, event_name]);

	const openMaps = useCallback(
		(type) => {
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

	const NavigateUserDetails = useCallback(
		(user_id) => {
			navigation.navigate('UserProfile', { user_id });
		},
		[navigation]
	);

	const mergedData = useMemo(() => {
		const allUsers = [...(teamUsers.player_infos || [])];
		if (!attendanceData.length) return allUsers;
		return allUsers.map((user) => {
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

	const toggleShowMap = useCallback(() => {
		setShowMap((prevState) => !prevState);
	}, []);

	const imageSource = useMemo(() => {
		switch (event_type) {
			case 'Training':
				return require('../../../assets/Basketball-rafiki.png');
			case 'Game':
				return require('../../../assets/Basketball-bro.png');
			default:
				return require('../../../assets/Basketball-bro.png');
		}
	}, [event_type]);

	const navigateToAttendance = useCallback(() => {
		navigation.navigate('TakeAttendance', {
			event_id,
			event_type,
			mergedData,
		});
	}, [navigation, event_id, event_type, mergedData]);

	if (isTeamUsersLoading || isAttendanceLoading) {
		return <Text>Loading...</Text>;
	}

	if (isTeamUsersError || isAttendanceError) {
		return <Text>Error loading data</Text>;
	}

	return (
		<>
			<GoBackButton />
			<AnimatedHeader
				imageSource={imageSource}
				scrollY={scrollY}
				headerHeight={headerHeight}
			/>
			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
				className="flex-1"
				contentContainerStyle={{ paddingTop: headerHeight }}
			>
				<View
					style={{
						borderTopLeftRadius: 30,
						borderTopRightRadius: 30,
						backgroundColor: '#F8F8F8',
						padding: 20,
					}}
				>
					<EventDetailsSection
						team_name={team_name}
						event_type={event_type}
						place={place}
						eventDate={eventDate}
					/>

					{user?.role === 'Coach' && hasEventPassed ? (
						<View className="mb-5">
							<SubmitButton
								onPress={navigateToAttendance}
								title="Take Attendance"
							/>
						</View>
					) : null}

					<MapSection
						showMap={showMap}
						toggleShowMap={toggleShowMap}
						coordinates={coordinates}
						place={place}
						event_name={event_name}
						team_name={team_name}
						handleMarkerPress={handleMarkerPress}
					/>

					<View style={{ marginTop: 20 }}>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
						>
							Coaches
						</Text>
						{(teamUsers.coach_infos || []).map((coach) => (
							<PlayerCard
								id={coach._id}
								key={coach._id}
								name={coach.name}
								image={{
									uri:
										coach.photo || 'https://avatar.iran.liara.run/public/boy',
								}}
								position="Coach"
								onPress={() => NavigateUserDetails(coach._id)}
							/>
						))}
					</View>

					{!hasEventPassed && (
						<View style={{ marginTop: 20 }}>
							<Text
								style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
							>
								Players
							</Text>
							{(teamUsers.player_infos || []).map((player) => (
								<PlayerCard
									id={player._id}
									key={player._id}
									name={player.name}
									image={{
										uri:
											player.photo ||
											'https://avatar.iran.liara.run/public/boy',
									}}
									position="Player"
									onPress={() => NavigateUserDetails(player._id)}
								/>
							))}
						</View>
					)}

					{hasEventPassed && (
						<View style={{ marginTop: 20 }}>
							<Text
								style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
							>
								Attendance
							</Text>
							{mergedData.map((user) => (
								<PlayerCard
									id={user._id}
									key={user._id}
									name={user.name}
									image={{
										uri:
											user.photo || 'https://avatar.iran.liara.run/public/boy',
									}}
									position="Player"
									attended={user.attended}
									onPress={() => NavigateUserDetails(user._id)}
								/>
							))}
						</View>
					)}
				</View>
			</Animated.ScrollView>
		</>
	);
};

export default memo(EventDetailPage);
