import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../../../features/auth/auth.slice';
import EventHistory from '../../components/ui/Home/EventHistory';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../../../store';
import { AppLayout } from '../../components';
import GoBackButton from '../../components/ui/GoBackButton';

const EventHistoryPage = () => {
	const navigation = useNavigation();
	const user = useSelector((state: RootState) => getAuthUser(state));
	return (
		<AppLayout>
            <GoBackButton/>
			<View className="flex-1">
				<EventHistory user={user} navigation={navigation} />
			</View>
		</AppLayout>
	);
};

export default EventHistoryPage;
