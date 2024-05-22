import { View, Text } from 'react-native'
import React from 'react'

type NotificationCardProps = {
  title: string;
  description: string;
}
const NotificationCard = ({title,description}: NotificationCardProps) => {
  return (
    <View className='p-3 mt-2 bg-white rounded-xl'>
      <Text className='font-semibold text-md'>{title}</Text>
      <Text className='text-sm'>{description}</Text>
    </View>
  )
}

export default NotificationCard