import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DateTimeSelection = ({ label, date, time, onDateChange, onTimeChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    onDateChange(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    onTimeChange(currentTime);
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View className="p-3 flex-row justify-between items-center">
      <View>
        <Text className="text-md font-bold">{label}</Text>
      </View>
      <View className="flex-row gap-x-4">
        <TouchableOpacity
          className="flex-row items-center px-2 py-1 bg-gray-200 rounded-xl shadow"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="mr-2">{formatDate(date)}</Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center px-2 py-1 bg-gray-200 rounded-xl shadow"
          onPress={() => setShowTimePicker(true)}
        >
          <Text className="mr-2">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default DateTimeSelection;
