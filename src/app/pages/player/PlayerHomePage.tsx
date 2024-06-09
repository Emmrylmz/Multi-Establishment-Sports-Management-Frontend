import { View, Text, FlatList, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useState, useCallback } from 'react';
import { AppLayout } from '../../components';
import {
	MaterialCommunityIcons,
	FontAwesome5,
	MaterialIcons,
} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import eventQueryService from '../../../features/query/eventQueryService';
import EventList from '../../components/ui/Event/EventList';
import HomeWidget from '../../components/ui/HomeWidget';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';
import Calendar from '../../components/ui/Event/Calendar';
import { useAuthStatus } from '../../../hooks/useAuthStatus';

const PlayerHomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
	const { user } = useAuthStatus();
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		try {
			await dispatch(eventQueryService.util.invalidateTags(['Events']));
		} catch (error) {
			console.error('Error during refresh:', error);
		} finally {
			setRefreshing(false);
		}
	}, []);

	const upcomingEvents = [
		{
			id: 1,
			title: 'Team Meeting',
			team_name: 'U18 A',
			date: "2024-06-10T09:00:00.000Z",
			time: '12:00',
			event_type: '1',
			location: 'Ege Üniversitesi Spor Bil. Fak. Top. Sal.',
			coordinates: {
				latitude: 38.4593697,
				longitude: 27.2233336
			},
			locationName: 'Location 1'
		},
		{
			id: 2,
			title: 'Weight Lifting',
			team_name: 'U18 A',
			date: "2024-06-10T09:00:00.000Z",
			time: '12:00',
			event_type: 'Weight Lifting',
			location: 'Ege Üniversitesi Spor Bil. Fak. Fit. Sal.',
			coordinates: {
				latitude: 38.4593697,
				longitude: 27.2233336
			},
			locationName: 'Location 3'
		}
	];

	const { width: screenWidth } = Dimensions.get('window');
	const itemWidth = screenWidth * 0.8; // 80% of the screen width

	const upcomingEventsList = upcomingEvents.map(event => ({
		id: event.id,
		component: (
			<TouchableOpacity
				key={event.id}
				style={{ width: itemWidth }}
				className='p-4 m-2 bg-white rounded-2xl'
				onPress={() => navigation.navigate('EventDetailPage', {
					event_id: event.id,
					team_name: event.team_name,
					event_name: event.title,
					place: event.location,
					coordinates: event.coordinates,
					location: event.location
				})}
			>
				<View className='flex-row items-center justify-between mb-1'>
					<Text className='text-lg font-bold'>{event.title}</Text>
					<Text>{new Date(event.date).toLocaleDateString()}</Text>
				</View>
				<View className='flex-row items-center justify-between mt-1'>
					<Text>{event.location}</Text>
					<Text>{event.time}</Text>
				</View>
				
			</TouchableOpacity>
		)
	}));

	const horizontalData = [
		{
			id: 1,
			component: (
				<View className="p-4 bg-white rounded-[38px] m-2">
					<Calendar />
				</View>
			),
		},
		{
			id: 2,
			component: (
				<HomeWidget
					title="Teams"
					icon={<FontAwesome5 name="users" color="black" size={64} />}
					clickable={true}
					onPress={() => navigation.navigate('TeamsPage',{userId: 1})}
				/>
			),
		},
		{
			id: 3,
			component: (
				<HomeWidget
					title="Attendance"
					icon={<MaterialCommunityIcons name="clipboard-check" size={72} color="black" />}
					clickable={true}
					onPress={() => navigation.navigate('AttendancePage', { userId: 1 })} //currently user state doesn't have id
				/>
			)
		},
	];

	const data = [
		{
			id: 'eventList',
			component: <EventList navigation={navigation} />,
		},
		{
			id: 'upcomingEvents',
			component: (
				<FlatList
					horizontal={true}
					data={upcomingEventsList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => item.component}
				/>
			),
		},
		{
			id: 'horizontalList',
			component: (
				<FlatList
					horizontal
					data={horizontalData}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => item.component}
					showsHorizontalScrollIndicator={false}
				/>
			),
		},
		{
			id: 'widgets',
			component: (
				<View className="flex-row items-center justify-between w-full pt-3">
					<HomeWidget
						title="payment"
						onPress={() => navigation.navigate('PaymentPage')}
						clickable={true}
						additionalViewStyle="py-4 px-12"
						additionalTextStyle="text-base font-medium"
						icon={<MaterialIcons name="payment" size={24} color="black" />}
					/>
					<HomeWidget
						title="coach note"
						additionalViewStyle="px-12 py-4"
						additionalTextStyle="text-base font-medium"
						icon={
							<MaterialCommunityIcons name="whistle" size={24} color="black" />
						}
					/>
				</View>
			),
		},
		{
			id: 'playerProgress',
			component: (
				<View className="bg-white rounded-[38px] h-[300px] my-3">
					<Text className="text-xl text-center text-dacka-gray">
						Player Progress
					</Text>
					<PagerView
						initialPage={0}
						scrollEnabled={true}
						useNext={true}
						overdrag={true}
					>
						<BarChart key={1} />
						<LineChart key={2} />
					</PagerView>
				</View>
			),
		},
	];

	return (
		<AppLayout>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => item.component}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</AppLayout>
	);
};

export default PlayerHomePage;
