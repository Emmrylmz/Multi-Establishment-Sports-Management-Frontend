import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
	useAddAttendancesToEventMutation,
	useUpdateAttendancesMutation,
} from '../../../../features/query/eventQueryService';
import { RootState } from '../../../../../store';
import PlayerCard from '../PlayerCard';

const TakeAttendance = ({ route, navigation }) => {
	const { event_id, event_type, mergedData } = route.params;
	const user = useSelector((state: RootState) => state.auth.user);

	const [addAttendance] = useAddAttendancesToEventMutation();
	const [updateAttendance] = useUpdateAttendancesMutation();

	const [attendanceList, setAttendanceList] = useState(mergedData);

	const handleAttendanceChange = useCallback((userId) => {
		setAttendanceList((prevList) =>
			prevList.map((item) =>
				item._id === userId ? { ...item, attended: !item.attended } : item
			)
		);
	}, []);

	const submitAttendance = useCallback(async () => {
		const newAttendances = attendanceList.map((item) => ({
			user_id: item._id,
			status: item.attended ? 'present' : 'absent',
		}));

		const attendanceForm = {
			event_id: event_id,
			event_type: 'training',
			attendances: newAttendances,
		};
		console.log(mergedData);
		try {
			if (mergedData.some((item) => 'attended' in item)) {
				await updateAttendance(attendanceForm).unwrap();
				Alert.alert('Success', 'Attendance records updated successfully');
			} else {
				await addAttendance(attendanceForm).unwrap();
				Alert.alert('Success', 'Attendance records submitted successfully');
			}
			navigation.goBack();
		} catch (error) {
			Alert.alert('Error', 'Failed to submit attendance. Please try again.');
		}
	}, [
		attendanceList,
		event_id,
		event_type,
		addAttendance,
		updateAttendance,
		navigation,
	]);

	const renderAttendanceItem = useCallback(
		({ item }) => (
			<PlayerCard
				id={item._id}
				name={item.name}
				image={{
					uri: item.photo || 'https://avatar.iran.liara.run/public/boy',
				}}
				position={item.role || 'Player'}
				attended={item.attended}
				onPress={() => handleAttendanceChange(item._id)}
			/>
		),
		[handleAttendanceChange]
	);

	return (
		<View className="flex-1 p-5 bg-gray-100">
			<Text className="text-2xl font-bold my-5">Attendance</Text>
			<FlatList
				data={attendanceList}
				renderItem={renderAttendanceItem}
				keyExtractor={(item) => item._id}
			/>
			<TouchableOpacity
				onPress={submitAttendance}
				className="bg-teal-600 p-4 rounded-lg mt-4"
			>
				<Text className="text-white text-center font-bold">
					{attendanceList.length === 0
						? 'Submit Attendance'
						: 'Update Attendance'}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TakeAttendance;
