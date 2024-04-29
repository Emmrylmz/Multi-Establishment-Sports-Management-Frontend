import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

type PlayerCardProps = {
  name: string,
  dateOfBirth: string,
  image: ImageSourcePropType,
  isAdded: boolean,
  addUserToAttendanceList: (playerName: string) => void
  removeUserFromAttendanceList: (playerName: string) => void
}

const PlayerCard = ({name,dateOfBirth,image,addUserToAttendanceList,isAdded,removeUserFromAttendanceList}: PlayerCardProps) => {
  function handleUserEvent() {
    if(!isAdded) {
      return addUserToAttendanceList(name)
    }
    return removeUserFromAttendanceList(name)
  }
  return (
    <TouchableOpacity onPress={handleUserEvent} className={`flex-row items-center justify-between w-full p-4 my-3 ${isAdded ? 'bg-dacka-green ': 'bg-dacka-dark-gray'}`}>
    <View>
      <View className='mb-3'>
        <Text className={isAdded ? 'text-dacka-black' : 'text-dacka-gray'}>athlete</Text>
        <Text className='text-white'>{name}</Text>
      </View>
      <View className='mt-3'>
        <Text className={isAdded ? 'text-dacka-black' : 'text-dacka-gray'}>date of birth</Text>
        <Text className='text-white'>{dateOfBirth}</Text>
      </View>
    </View>
    <View className='w-1/4'>
      <Image source={image} className="w-full h-24 rounded-full" />
    </View>
  </TouchableOpacity>
  )
}

export default PlayerCard