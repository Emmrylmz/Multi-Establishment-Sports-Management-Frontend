import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import eventQueryService, {
	useAddAttendancesToEventMutation,
	useUpdateAttendancesMutation,
} from '../../../../features/query/eventQueryService';
import { RootState } from '../../../../../store';
import PlayerCard from '../Player/PlayerCard';
import userInfoQueryService from '../../../../features/query/userInfoQueryService';

const TakeAttendance = ({ route, navigation }) => {
	const { t } = useTranslation();
	const { event_id, event_type, mergedData } = route.params;
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();

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
			event_type: event_type.toLowerCase(),
			attendances: newAttendances,
		};
		console.log(attendanceForm);
		try {
			if (mergedData.some((item) => 'attended' in item)) {
				await updateAttendance(attendanceForm).unwrap();
				Alert.alert('Success', 'Attendance records updated successfully');
			} else {
				await addAttendance(attendanceForm).unwrap();
				Alert.alert('Success', 'Attendance records submitted successfully');
			}
			dispatch(
				eventQueryService.util.invalidateTags([
					{ type: 'Attendances', id: event_id },
				])
			);
			dispatch(
				userInfoQueryService.util.invalidateTags(
					attendanceList.map((item) => ({ type: 'UserInfo', id: item._id }))
				)
			);
			navigation.goBack();
		} catch (error) {
			Alert.alert('Error', 'Failed to submit attendance. Please try again.');
		}
	}, [
		[
			attendanceList,
			event_id,
			event_type,
			addAttendance,
			updateAttendance,
			dispatch,
			navigation,
		],
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
			<Text className="my-5 text-2xl font-bold">{t("eventDetailPage.takeAttendancePage.title")}</Text>
			<FlatList
				data={attendanceList}
				renderItem={renderAttendanceItem}
				keyExtractor={(item) => item._id}
			/>
			<TouchableOpacity
				onPress={submitAttendance}
				className="p-4 mt-4 bg-teal-600 rounded-lg"
			>
				<Text className="font-bold text-center text-white">
					{attendanceList.length === 0
						? t("eventDetailPage.takeAttendancePage.submmit")
						: t("eventDetailPage.takeAttendancePage.update")
					}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TakeAttendance;
