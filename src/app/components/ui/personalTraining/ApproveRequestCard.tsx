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
  onApprove: () => void,  // New prop for handling modal opening
}

const ApproveRequestCard = ({name, location, duration, startTime, endTime, description, onApprove}: ApproveRequestCardProps) => {
  const { t } = useTranslation()
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
      <View className="flex-row justify-between mb-4">
        <View>
          <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.startTime")}</Text>
          <Text className="text-sm text-black dark:text-white">{startTime}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500 uppercase dark:text-gray-400">{t("ptRequestPage.cardComponent.endTime")}</Text>
          <Text className="text-sm text-black dark:text-white">{endTime}</Text>
        </View>
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
          onPress={onApprove}  // Use the new prop here
        >
          <Text className="text-sm font-medium text-white dark:text-black">{t("ptRequestPage.cardComponent.approve")}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ApproveRequestCard