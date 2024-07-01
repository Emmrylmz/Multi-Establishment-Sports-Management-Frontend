import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import EventList from '../../components/ui/Event/EventList';
import HomeWidget from '../../components/ui/HomeWidget';
import PagerView from 'react-native-pager-view';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';
import {
	MaterialCommunityIcons,
	FontAwesome5,
	MaterialIcons,
} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import eventQueryService from '../../../features/query/eventQueryService';
import Calendar from '../../components/ui/Event/Calendar';
import { useAuthStatus } from '../../../hooks/useAuthStatus';
import BackgroundImage from '../../components/ui/BackgroundImage/BackgroundImage';

const CoachHomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const { user } = useAuthStatus();
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

	const horizontalData = [
		{
			id: 1,
			component: (
				<View className="p-3 bg-white rounded-[38px] my-3">
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
					onPress={() => navigation.navigate('CoachTeamsPage', { team_id: 1 })} // Pass a sample team ID
				/>
			),
		},
		{
			id: 3,
			component: (
				<HomeWidget
					title="Attendance"
					clickable={true}
					icon={<FontAwesome5 name="user-check" size={64} color="black" />}
					onPress={() =>
						navigation.navigate('CoachAttendanceTeamsListPage', { userId: 1 })
					}
				/>
			),
		},
	];

	const mainData = [
		{
			id: 'eventList',
			component: (
				<View className="my-2">
					<Text className="text-xl text-white">Upcoming Events</Text>
					<EventList navigation={navigation} orientation="horizontal" />
				</View>
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
				<View className="flex-row items-center justify-between w-full">
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
		<BackgroundImage>
			<AppLayout>
				<FlatList
					data={mainData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => item.component}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
			</AppLayout>
		</BackgroundImage>
	);
};

export default CoachHomePage;
