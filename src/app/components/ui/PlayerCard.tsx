import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { playerCardTexts } from '../../../utils/constants/texts'

type PlayerCardProps = {
  name: string,
  dateOfBirth: string,
  image: ImageSourcePropType,
  navigation?: () => void
}

const PlayerCard = ({name,dateOfBirth,image,navigation}: PlayerCardProps) => {

  return (
    <TouchableOpacity onPress={navigation} className='flex-row items-center justify-between w-full p-4 my-3 bg-dacka-dark-gray'>
    <View>
      <View className='mb-3'>
        <Text className='text-dacka-gray'>{playerCardTexts.athlete}</Text>
        <Text className='text-white'>{name}</Text>
      </View>
      <View className='mt-3'>
        <Text className='text-dacka-gray'>{playerCardTexts.dateOfBirth}</Text>
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