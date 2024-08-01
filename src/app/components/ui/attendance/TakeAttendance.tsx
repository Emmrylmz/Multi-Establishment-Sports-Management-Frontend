import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import eventQueryService, {
  useAddAttendancesToEventMutation,
  useUpdateAttendancesMutation,
} from '../../../../features/query/eventQueryService';
import { RootState } from '../../../../../store';
import PlayerCard from '../Player/PlayerCard';
import userInfoQueryService from '../../../../features/query/userInfoQueryService';
import Toast from '../../ui/toasts/Toast';

const TakeAttendance = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { event_id, event_type, mergedData } = route.params;
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [addAttendance] = useAddAttendancesToEventMutation();
  const [updateAttendance] = useUpdateAttendancesMutation();
  const [attendanceList, setAttendanceList] = useState(mergedData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState({ message: '', type: 'info', visible: false });

  const handleAttendanceChange = useCallback((userId) => {
    setAttendanceList((prevList) =>
      prevList.map((item) =>
        item._id === userId ? { ...item, attended: !item.attended } : item
      )
    );
  }, []);

  const showToast = (message, type = 'info') => {
    setToastConfig({ message, type, visible: true });
  };

  const hideToast = () => {
    setToastConfig(prev => ({ ...prev, visible: false }));
  };

  const submitAttendance = useCallback(async () => {
    setIsSubmitting(true);
    showToast(t("eventDetailPage.takeAttendancePage.submitting"), 'info');
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
        showToast(t("eventDetailPage.takeAttendancePage.updateSuccess"), 'success');
      } else {
        await addAttendance(attendanceForm).unwrap();
        showToast(t("eventDetailPage.takeAttendancePage.submitSuccess"), 'success');
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
      setTimeout(() => {
        navigation.goBack();
      }, 2000); // Give some time for the user to see the success message
    } catch (error) {
      showToast(t("eventDetailPage.takeAttendancePage.submitError"), 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    attendanceList,
    event_id,
    event_type,
    addAttendance,
    updateAttendance,
    dispatch,
    navigation,
    mergedData,
    t,
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
      <Text className="my-5 text-2xl font-bold">
        {t("eventDetailPage.takeAttendancePage.title")}
      </Text>
      <FlatList
        data={attendanceList}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity
        onPress={submitAttendance}
        disabled={isSubmitting}
        className={`p-4 mt-4 rounded-lg ${
          isSubmitting ? 'bg-gray-400' : 'bg-teal-600'
        }`}
      >
        <Text className="font-bold text-center text-white">
          {isSubmitting
            ? t("eventDetailPage.takeAttendancePage.submitting")
            : attendanceList.length === 0
            ? t("eventDetailPage.takeAttendancePage.submit")
            : t("eventDetailPage.takeAttendancePage.update")
          }
        </Text>
      </TouchableOpacity>
      {toastConfig.visible && (
        <Toast
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={hideToast}
        />
      )}
    </View>
  );
};

export default TakeAttendance;