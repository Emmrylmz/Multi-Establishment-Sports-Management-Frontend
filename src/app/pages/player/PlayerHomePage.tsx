import { View, Text} from 'react-native';
import React, { useState, useCallback } from 'react';
import { AppLayout } from '../../components';
import { useDispatch } from 'react-redux';
import eventQueryService from '../../../features/query/eventQueryService';
import { useAuthStatus } from '../../../hooks/useAuthStatus';
import UpcomingEvents from '../../components/ui/Home/UpcomingEvents';
import QuickActions from '../../components/ui/Home/QuickActions';

const PlayerHomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
	const { user } = useAuthStatus(); 
	console.log(user?._id)
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

	return (
		<AppLayout>
			<Text>Player Home Page</Text>
			<QuickActions navigation={navigation} user={user} />
			<UpcomingEvents navigation={navigation} user={user} />
		</AppLayout>
	);
};

export default PlayerHomePage;
