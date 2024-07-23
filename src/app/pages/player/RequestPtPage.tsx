import React, { useState } from 'react';
import { View, Text, useColorScheme, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AppLayout, InputField } from '../../components';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import { useCreate_private_lessonMutation } from '../../../features/query/personalTrainingService';
import { useGetAllCoachesQuery } from '../../../features/query/teamQueryService';
import { useAuthStatus } from '../../../hooks/useAuthStatus';

const RequestPtPage = ({ navigation }) => {
  const { user } = useAuthStatus();
  const { t, i18n } = useTranslation();
  const isDark = useColorScheme() === 'dark';
  const { data: coachesData, } = useGetAllCoachesQuery(user?.province || 'Izmir');
  const formattedCoaches = React.useMemo(() => {
    return coachesData?.map(coach => ({
      label: coach.name,
      value: coach._id
    })) || [];
  }, [coachesData]);
  console.log('formated coaches', formattedCoaches);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [createPrivateLesson] = useCreate_private_lessonMutation();

  type FormData = {
    coach_id: string;
    start_datetime: string | null;
    description: string;
    player_id: string | undefined;
    place: string;
    end_datetime: string;
    lesson_fee: number;
    paid: boolean;
    request_status: string;
    request_date: string;
    preferred_date: string;
    preferred_time: string;
    request_notes: string;
    response_date: string;
    response_notes: string;
  };

  const [formData, setFormData] = useState<FormData>({
    coach_id: '',
    start_datetime: null,
    description: '',
    player_id: user?._id,
    place: 'string',
    end_datetime: '2024-07-14T19:42:34.425Z',
    lesson_fee: 0,
    paid: false,
    request_status: 'pending',
    request_date: '2024-07-14T19:42:34.425Z',
    preferred_date: '2024-07-14T19:42:34.425Z',
    preferred_time: 'string',
    request_notes: 'string',
    response_date: '2024-07-14T19:42:34.425Z',
    response_notes: 'string'
  });

  const turkishLocale = {
    monthNames: [
      t("months.january"), t("months.february"), t("months.march"), 
      t("months.april"), t("months.may"), t("months.june"), 
      t("months.july"), t("months.august"), t("months.september"), 
      t("months.october"), t("months.november"), t("months.december")
    ],
    dayNames: [
      t('days.sun'), t('days.mon'), t('days.tue'), 
      t('days.wed'), t('days.thu'), t('days.fri'), t('days.sat')
    ]
  };

  const dummyAvailableTimes = {
    '667885399e20386c38d7d03e': {
      '2024-07-19T00:00:00.000Z': { available: true, times: ['2024-07-19T09:00:00.000Z', '2024-07-19T16:00:00.000Z'] },
      '2024-07-23T00:00:00.000Z': { available: true, times: ['2024-07-23T10:00:00.000Z'] },
      '2024-07-24T00:00:00.000Z': { available: true, times: ['2024-07-24T11:00:00.000Z', '2024-07-24T15:00:00.000Z'] },
      '2024-07-25T00:00:00.000Z': { available: false, times: [] }
    },
    '2': {
      '2024-07-15T00:00:00.000Z': { available: true, times: ['2024-07-15T11:00:00.000Z'] },
      '2024-07-16T00:00:00.000Z': { available: false, times: [] },
      '2024-07-17T00:00:00.000Z': { available: true, times: ['2024-07-17T15:00:00.000Z', '2024-07-17T17:00:00.000Z'] },
      '2024-07-18T00:00:00.000Z': { available: true, times: ['2024-07-18T13:00:00.000Z'] }
    },
    '3': {
      '2024-07-15T00:00:00.000Z': { available: false, times: [] },
      '2024-07-16T00:00:00.000Z': { available: true, times: ['2024-07-16T16:00:00.000Z'] },
      '2024-07-17T00:00:00.000Z': { available: true, times: ['2024-07-17T10:00:00.000Z', '2024-07-17T14:00:00.000Z'] },
      '2024-07-18T00:00:00.000Z': { available: true, times: ['2024-07-18T08:00:00.000Z', '2024-07-18T16:00:00.000Z'] }
    }
  };

  const handleDateSelect = (date: Date | null) => {
    if (!date || !selectedCoach) return;
  
    const formattedDate = date.toISOString().split('T')[0] + 'T00:00:00.000Z';
    const dayData = dummyAvailableTimes[selectedCoach][formattedDate];
  
    if (dayData?.available) {
      setFormData(prev => ({ ...prev, preferred_date: formattedDate }));
      setAvailableTimes(dayData.times);
    } else {
      Alert.alert('No Availability', 'The selected coach is not available on this day. Please choose another date.');
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, preferred_time: time, start_datetime: time }));
  };
  
  const handleCoachSelect = coachId => {
    setSelectedCoach(coachId);
    setFormData(prev => ({ ...prev, coach_id: coachId, preferred_date: '', preferred_time: '', start_datetime: null }));
  };

  const getCustomDatesStyles = () => {
    if (!selectedCoach) return [];
  
    return Object.entries(dummyAvailableTimes[selectedCoach]).map(([date, dayData]) => ({
      date: new Date(date),
      style: { backgroundColor: dayData.available ? '#4CAF50' : '#FF5252' },
      textStyle: { color: 'white' }
    }));
  };

  const handleSubmitRequest = async () => {
    if (formData.coach_id && formData.start_datetime) {
      const updatedFormData = { ...formData };
      console.log(updatedFormData);
      try {
        await createPrivateLesson(updatedFormData).unwrap();
        console.log('Submitting request:', updatedFormData);
        Alert.alert('Success', 'Your request has been submitted successfully!');
      } catch (error) {
        console.error('Failed to submit request:', error);
        Alert.alert('Error', 'There was an error submitting your request. Please try again.');
      }
    } else {
      Alert.alert('Incomplete Form', 'Please select a coach, date, and time before submitting.');
    }
  };


  return (
    <AppLayout>
      <ScrollView className="flex-1">
        <View className="flex-row items-center justify-between w-full mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-black dark:text-white">{t("requestPtPage.title")}</Text>
          <View style={{ width: 24 }} />
        </View>

        <Dropdown
          data={formattedCoaches}
          labelField="label"
          valueField="value"
          value={selectedCoach}
          onChange={item => handleCoachSelect(item.value)}
          placeholder={t("requestPtPage.selectCoach")}
          className={`p-2 mb-4 rounded-xl ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
          placeholderStyle={{ color: isDark ? 'white' : 'black' }}
          selectedTextStyle={{ color: isDark ? 'white' : 'black' }}
        />

        {selectedCoach && (
          <>
            <Text className="mt-6 mb-2 text-lg font-semibold text-black dark:text-white">{t("requestPtPage.selectDate")}</Text>
            <CalendarPicker
              onDateChange={handleDateSelect}
              customDatesStyles={getCustomDatesStyles()}
              minDate={new Date()}
              selectedDayColor="#007AFF"
              selectedDayTextColor="#FFFFFF"
              todayBackgroundColor="#E0E0E0"
              todayTextStyle={{ color: '#000000' }}
              textStyle={{ color: isDark ? 'white' : 'black' }}
              monthNames={turkishLocale.monthNames}
              weekdays={turkishLocale.dayNames}
              previousTitle={t('calendar.previous')}
              nextTitle={t('calendar.next')}
            />
          </>
        )}

{formData.preferred_date && formData.coach_id && (
  <>
    <Text className="mt-6 mb-2 text-lg font-semibold text-black dark:text-white">{t("requestPtPage.availableHours")}</Text>
    <View className="flex flex-row flex-wrap mt-2 mb-4">
      {availableTimes.map((time, index) => {
        const timeObj = new Date(time);
        const formattedTime = timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return (
          <TouchableOpacity
            key={index}
            className={`flex flex-row items-center justify-center p-2 m-1 rounded-full w-20 h-10 ${
              formData.preferred_time === time 
                ? 'bg-black dark:bg-white' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
            onPress={() => handleTimeSelect(time)}
          >
            <Text 
              className={`text-xs ${
                formData.preferred_time === time 
                  ? 'text-white dark:text-black' 
                  : 'text-black dark:text-white'
              }`}
            >
              {formattedTime}
            </Text>
            {formData.preferred_time === time && (
              <Ionicons 
                name="checkmark-circle" 
                size={16} 
                color={isDark ? 'black' : 'white'} 
                className="ml-1"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  </>
)}

        {formData.preferred_time && formData.preferred_date && formData.coach_id && (
          <InputField
            placeholder="Enter your expectations for the session"
            placeholderTextColor={isDark ? 'light' : 'dark'}
            handleInputChange={(name, text) => setFormData(prev => ({ ...prev, [name]: text }))}
            name="description"
            keyboardType="default"
            autoCapitalize="sentences"
            isLongText={true}
            additionalInputStyles="p-4 rounded-xl"
          />
        )}

        <TouchableOpacity
          className={`p-4 mt-8 mb-8 rounded-xl ${formData.coach_id && formData.preferred_date && formData.preferred_time ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'}`}
          onPress={handleSubmitRequest}
          disabled={!(formData.coach_id && formData.preferred_date && formData.preferred_time)}
        >
          <Text className={`font-semibold text-center ${formData.coach_id && formData.preferred_date && formData.preferred_time ? 'text-white dark:text-black' : 'text-gray-500 dark:text-gray-400'}`}>
          {t("requestPtPage.submit")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AppLayout>
  );
};

export default RequestPtPage;