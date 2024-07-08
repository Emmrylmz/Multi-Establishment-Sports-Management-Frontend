import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	Alert,
	Platform,
	Linking,
	Animated,
	Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { useFetchAttendancesByEventIdQuery } from '../../../features/query/eventQueryService';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';
import EventDetailsSection from '../../components/ui/Event/EventDetailsSection';
import MapSection from '../../components/ui/Event/MapSection';
import AttendanceSection from '../../components/ui/Event/AttendanceSection';
import GoBackButton from '../../components/ui/GoBackButton';

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

	const { data: teamUsers = [] } = useGetTeamUsersByIdQuery(team_id);
	const { data: attendanceData = [] } = useFetchAttendancesByEventIdQuery(
		event_id,
		{
			skip: !hasEventPassed,
		}
	);

	const scrollY = useRef(new Animated.Value(0)).current;
	const headerHeight = SCREEN_HEIGHT * 0.33;

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
		navigation.navigate('ProfileContainer', { user_id });
	}, []);

	const mergedData = React.useMemo(() => {
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

	const toggleShowMap = useCallback(() => {
		setShowMap((prevState) => !prevState);
	}, []);

	const imageSource = React.useMemo(() => {
		switch (event_type) {
			case 'Training':
				return require('../../../assets/Basketball-rafiki.png');
			case 'Game':
				return require('../../../assets/Basketball-bro.png');
			default:
				return require('../../../assets/Basketball-bro.png');
		}
	}, [event_type]);

	return (
		<LinearGradient colors={['#00897B', '#3FA454']} className="flex-1">
			<GoBackButton />
			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
			>
				<AnimatedHeader
					imageSource={imageSource}
					scrollY={scrollY}
					headerHeight={headerHeight}
				/>

				<View className="rounded-t-3xl bg-gray-100 p-6">
					<EventDetailsSection
						team_name={team_name}
						event_type={event_type}
						place={place}
						eventDate={eventDate}
					/>

					<MapSection
						showMap={showMap}
						toggleShowMap={toggleShowMap}
						coordinates={coordinates}
						place={place}
						event_name={event_name}
						team_name={team_name}
						handleMarkerPress={handleMarkerPress}
					/>

					<AttendanceSection
						hasEventPassed={hasEventPassed}
						mergedData={mergedData}
						NavigateUserDetails={NavigateUserDetails}
					/>
				</View>
			</Animated.ScrollView>
		</LinearGradient>
	);
};

export default EventDetailPage;
