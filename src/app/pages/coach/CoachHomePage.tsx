import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import EventList from '../../components/ui/Event/EventList';
import HomeWidget from '../../components/ui/HomeWidget';
import CalendarPicker from 'react-native-calendar-picker';
import PagerView from 'react-native-pager-view';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';
import {
	MaterialCommunityIcons,
	FontAwesome5,
	MaterialIcons,
} from '@expo/vector-icons';
import { usePushNotifications } from '../../../hooks/usePushNotifications';
import { useDispatch } from 'react-redux';
import eventQueryService from '../../../features/query/eventQueryService';

const CoachHomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);
	const { notification } = usePushNotifications();
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

	const dates = [
		{ id: 1, date: '2024-05-15T09:00:00.000Z' },
		{ id: 2, date: '2024-05-16T09:00:00.000Z' },
		{ id: 3, date: '2024-05-17T09:00:00.000Z' },
		{ id: 4, date: '2024-05-18T09:00:00.000Z' },
		{ id: 5, date: '2024-05-19T09:00:00.000Z' },
		{ id: 6, date: '2024-06-20T09:00:00.000Z' },
	];

	const customDatesStyles = dates.map((date) => ({
		date: new Date(date.date),
		style: { backgroundColor: '#3FA454' },
		textStyle: { color: '#000' },
	}));

	const horizontalData = [
		{
			id: 1,
			component: (
				<View className="p-3 bg-white rounded-[38px] m-2">
					<CalendarPicker
						width={200}
						textStyle={{ color: '#000', fontSize: 12 }}
						todayBackgroundColor="#000"
						todayTextStyle={{ color: '#fff' }}
						onDateChange={(date) => console.log(date)}
						customDatesStyles={customDatesStyles}
					/>
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
					onPress={() => navigation.navigate('CoachTeamsPage')}
				/>
			),
		},
		{
			id: 3,
			component: <HomeWidget title="Deneme" />,
		},
	];

	const mainData = [
		{
			id: 'eventList',
			component: <EventList navigation={navigation} />,
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
	);
};

export default CoachHomePage;
