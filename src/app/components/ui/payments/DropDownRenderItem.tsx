import { View, Text } from 'react-native'
import React from 'react'

type DropDownRenderItemProps = {
  item: { label: string, value: string }
}
const DropDownRenderItem = ({item}: DropDownRenderItemProps) => {
  return (
    <View className="flex-row items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
      <Text className="text-base font-medium text-gray-800 dark:text-gray-200">
        {item.label}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        {item.value}
      </Text>
    </View>
  )
}

export default DropDownRenderItem