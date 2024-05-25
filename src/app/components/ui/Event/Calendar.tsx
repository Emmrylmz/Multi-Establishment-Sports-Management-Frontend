import { View, Text } from 'react-native';
import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../../../../features/auth/auth.slice';
import {
	selectListEventsResult,
	useListEventsQuery,
} from '../../../../features/query/eventQueryService';
import { RootState } from '../../../../../store';

const Calendar = () => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const listEventsResult = useSelector((state: RootState) =>
		selectListEventsResult(user?.teams)(state)
	);

	const customDatesStyles = listEventsResult.data[0].events.map((date) => ({
		date: new Date(date.event_date),
		style: { backgroundColor: '#3FA454' },
		textStyle: { color: '#000' },
	}));
	console.log(listEventsResult.data[0].events);
	return (
		<CalendarPicker
			width={200}
			textStyle={{ color: '#000', fontSize: 12 }}
			todayBackgroundColor="#000"
			todayTextStyle={{ color: '#fff' }}
			onDateChange={(date) => console.log(date)}
			customDatesStyles={customDatesStyles}
		/>
	);
};

export default Calendar;
