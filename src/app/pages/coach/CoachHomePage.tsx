import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import EventList from '../../components/ui/Event/EventList';
import { AppLayout } from '../../components';
import Header from '../../components/ui/Home/Header';
import StatsOverview from '../../components/ui/Home/StatsCard';
import QuickActions from '../../components/ui/Home/QuickActions';
import UpcomingEvents from '../../components/ui/Home/UpcomingEvents';

const CoachHomePage = ({ navigation }) => {
	const user = useSelector((state: RootState) => getAuthUser(state));

	return (
		<ScrollView className="flex-1 bg-gray-100">
			<Header user={user} />
			<AppLayout>
				<StatsOverview user={user} />
				<QuickActions user={user} />
				<UpcomingEvents navigation={navigation} />
			</AppLayout>
		</ScrollView>
	);
};

export default CoachHomePage;
