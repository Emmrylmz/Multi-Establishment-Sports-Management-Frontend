import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DateTimeSelection = ({ label, date, time, onDateChange, onTimeChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const isDark = useColorScheme() === 'dark';

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    onDateChange(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    onTimeChange(currentTime);
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View className="flex-row items-center justify-between h-auto p-3">
      <View>
        <Text className="font-bold text-black text-md dark:text-white">{label}</Text>
      </View>
      <View className="flex-row gap-4">
        <TouchableOpacity
          className="flex-row items-center px-2 py-1 bg-gray-200 shadow dark:bg-gray-700 rounded-xl"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="mr-2 text-black dark:text-white">{formatDate(date)}</Text>
          <Icon name="chevron-down" size={16} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center px-2 py-1 bg-gray-200 shadow dark:bg-gray-700 rounded-xl"
          onPress={() => setShowTimePicker(true)}
        >
          <Text className="mr-2 text-black dark:text-white">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Icon name="chevron-down" size={16} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker || showTimePicker}
          onRequestClose={() => {
            setShowDatePicker(false);
            setShowTimePicker(false);
          }}
        >
          <View className="justify-end flex-1 bg-black bg-opacity-50">
            <View className="p-5 bg-white dark:bg-gray-800 rounded-t-2xl">
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  style={{ backgroundColor: isDark ? '#4B5563' : '#D1D5DB', width: '30%', alignSelf: 'flex-end' }}
                  accentColor={isDark ? '#fff' : '#000'}
                  textColor={isDark ? '#fff' : '#000'}
                  onChange={handleDateChange}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  style={{ backgroundColor: isDark ? '#4B5563' : '#D1D5DB', width: '20%', alignSelf: 'flex-end' }}
                  accentColor={isDark ? '#fff' : '#000'}
                  textColor={isDark ? '#fff' : '#000'}
                  onChange={handleTimeChange}
                />
              )}
              <TouchableOpacity
                className="items-center p-3 mt-5 bg-blue-500 rounded-lg dark:bg-blue-700"
                onPress={() => {
                  setShowDatePicker(false);
                  setShowTimePicker(false);
                }}
              >
                <Text className="font-bold text-white">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === 'android' && (
        <>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              textColor={isDark ? '#fff' : '#000'}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
              textColor={isDark ? '#fff' : '#000'}
            />
          )}
        </>
      )}
    </View>
  );
};

export default DateTimeSelection;