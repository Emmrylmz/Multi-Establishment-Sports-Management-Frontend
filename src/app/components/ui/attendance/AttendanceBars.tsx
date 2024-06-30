import { View, Text } from 'react-native'
import React from 'react'

type AttendanceBarsProps = {
  title: string
  attendandPercentage: number
}

const AttendanceBars: React.FC<AttendanceBarsProps> = ({title, attendandPercentage }) => {

  return (
    <View className="my-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold text-dacka-black">{title}</Text>
        <Text className="text-base font-bold text-dacka-black">{attendandPercentage}%</Text>
      </View>
      <View className="flex-row w-full">
        <View
          className="py-3 rounded-l-xl bg-dacka-black"
          style={{ width: `${attendandPercentage}%` }}
        ></View>
        <View
          className="py-3 bg-white rounded-r-xl"
          style={{ width: `${100 - attendandPercentage}%` }}
        ></View>
      </View>
    </View>
  )
}

export default AttendanceBars
