import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/ui/Home/Header';
import QuickActions from '../../components/ui/Home/QuickActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import RevenueCharts from '../../components/ui/Charts/RevenueCharts';
import RevenueCard from '../../components/ui/payments/RevenueCard';

const ManagerHomePage = () => {
	const navigation = useNavigation();
	const user = useSelector((state: RootState) => getAuthUser(state));
	const chartData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June'],
		datasets: [
			{
				data: [20, 45, 28, 80, 99, 43],
			},
		],
	};
	return (
		<ScrollView className="bg-dacka-white dark:bg-dacka-black">
			<Header user={user} navigation={navigation} />
			<View className="mt-10">
				<RevenueCard />
			</View>
			<View className="px-4 py-6 bg-gray-100 dark:bg-dacka-black">
				<QuickActions user={user} />
			</View>
		</ScrollView>
	);
};

export default ManagerHomePage;
