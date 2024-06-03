import { View, Text } from 'react-native'
import React from 'react'

type AttendanceCardProps = {
  cardTitle: string
  attended: number
  absent: number
}

const AttendanceCard:React.FC<AttendanceCardProps> = ({cardTitle,attended, absent}) => {
  return (
    <View className="w-[48%] px-6 py-4 bg-dacka-gray rounded-3xl">
      <Text className="text-xl font-bold text-dacka-black">{cardTitle}</Text>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-base font-bold text-dacka-black">present</Text>
          <View className="p-4 bg-green-400 rounded-xl">
            <Text className="text-xl">{attended}</Text>
          </View>
        </View>
        <View>
          <Text className="text-base font-bold text-dacka-black">absent</Text>
          <View className="p-4 bg-red-400 rounded-xl">
            <Text className="text-xl">{absent}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AttendanceCard