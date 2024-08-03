import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

type ApproveRequestCardProps = {
  name: string,
  location: string,
  duration: string,
  startTime: string,
  endTime: string,
  description: string,
  onApprove: () => void,
}

type TurkishLocale = {
  monthNames: string[];
  dayNames: string[];
}

const ApproveRequestCard = ({name, location, duration, startTime, endTime, description, onApprove}: ApproveRequestCardProps) => {
  const { t } = useTranslation()

  const turkishLocale: TurkishLocale = {
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

  // Function to format date and time with Turkish localization
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = turkishLocale.monthNames[date.getMonth()].substring(0, 3); // Get first 3 characters
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  const formattedStartTime = formatDateTime(startTime);
  const formattedEndTime = formatDateTime(endTime);

  return (
    <TouchableOpacity
      className="p-6 mb-4 bg-white border border-gray-200 shadow-md rounded-2xl dark:bg-gray-800 dark:border-gray-700">
      <View className="mb-4">
        <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.player")}</Text>
        <Text className="text-lg font-semibold text-black dark:text-white">{name}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <View className="flex-1">
          <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.location")}</Text>
          <Text className="text-base font-semibold text-black dark:text-white">{location}</Text>
        </View>
        <View className="flex items-end">
          <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.duration")}</Text>
          <Text className="text-base font-semibold text-black dark:text-white">{duration}</Text>
        </View>
      </View>
      <View className="mb-4">
        <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.startTime")}</Text>
        <Text className="text-sm text-black dark:text-white">{formattedStartTime}</Text>
      </View>
      <View className="mb-4">
        <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.endTime")}</Text>
        <Text className="text-sm text-black dark:text-white">{formattedEndTime}</Text>
      </View>
      <View>
        <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.description")}</Text>
        <Text className="text-sm text-black dark:text-white">{description}</Text>
      </View>
      <View className="flex-row justify-end mt-4">
        <TouchableOpacity className="px-4 py-2 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
          <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">{t("ptRequestPage.cardComponent.decline")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="px-4 py-2 bg-black rounded-full dark:bg-white"
          onPress={onApprove}
        >
          <Text className="text-sm font-medium text-white dark:text-black">{t("ptRequestPage.cardComponent.approve")}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ApproveRequestCard