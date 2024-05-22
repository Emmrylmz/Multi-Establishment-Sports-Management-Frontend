import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useListEventsQuery } from '../../../features/query/eventQueryService';
import AppLayout from '../../components/layout/AppLayout';
import EventCard from '../../components/ui/EventCard';
import { coachHomePageTexts } from '../../../utils/constants/texts';
import PagerView from 'react-native-pager-view';
import HomeWidget from '../../components/ui/HomeWidget';
import SearchBar from '../../components/ui/SearchBar';
import {
	MaterialCommunityIcons,
	FontAwesome5,
	MaterialIcons,
} from '@expo/vector-icons';
import BarChart from '../../components/charts/BarChart';
import CalendarPicker from 'react-native-calendar-picker';
import LineChart from '../../components/charts/LineChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import EventList from '../../components/ui/EventList';

const CoachHomePage: React.FC<{ navigation: any }> = ({ navigation }) => {

	

	const dates = [
		{
			id: 1,
			date: '2024-05-15T09:00:00.000Z',
		},
		{
			id: 2,
			date: '2024-05-16T09:00:00.000Z',
		},
		{
			id: 3,
			date: '2024-05-17T09:00:00.000Z',
		},
		{
			id: 4,
			date: '2024-05-18T09:00:00.000Z',
		},
		{
			id: 5,
			date: '2024-05-19T09:00:00.000Z',
		},
		{
			id: 6,
			date: '2024-06-20T09:00:00.000Z',
		},
	];
	const customDatesStyles = dates.map((date) => ({
		date: new Date(date.date),
		style: { backgroundColor: '#3FA454' },
		textStyle: { color: '#000' },
	}));

	const data = [
		{
			id: 1,
			component: (
				<View className="p-3 bg-white rounded-[38px]">
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

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);
	return (
		<AppLayout>
			{/* <SearchBar visible={showSearch} onClose={() => setShowSearch(false)} /> */}

			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						tintColor="#fff"
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				<EventList navigation={navigation}/> 

				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={data}
					className="my-3"
					renderItem={({ item }) => item.component}
				/>
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
			</ScrollView>
		</AppLayout>
	);
};

export default CoachHomePage;

