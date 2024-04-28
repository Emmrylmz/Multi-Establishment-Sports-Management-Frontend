import { View, Text,Image } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

type PlayerCardProps = {
  name: string,
  dateOfBirth: string,
  image: ImageSourcePropType,
}

const PlayerCard = ({name,dateOfBirth,image,imageClass}: PlayerCardProps) => {
  return (
    <View className='flex-row items-center justify-between w-full p-4 my-3 bg-dacka-dark-gray'>
    <View>
      <View className='mb-3'>
        <Text className='text-dacka-gray'>athlete</Text>
        <Text className='text-white'>{name}</Text>
      </View>
      <View className='mt-3'>
        <Text className='text-dacka-gray'>date of birth</Text>
        <Text className='text-white'>{dateOfBirth}</Text>
      </View>
    </View>
    <View className='w-1/4'>
      <Image source={image} className="w-full h-24 rounded-full" />
    </View>
  </View>
  )
}

export default PlayerCard