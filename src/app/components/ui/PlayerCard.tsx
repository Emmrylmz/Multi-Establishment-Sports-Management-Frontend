import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { playerCardTexts } from '../../../utils/constants/texts';

type PlayerCardProps = {
  name: string,
  dateOfBirth?: string,
  image: ImageSourcePropType,
  selected?: boolean,
  attended?: string,
  id: string,
  additionalStyles?: string,
  onPress: () => void,
};
const PlayerCard = ({ name, id, image, attended, additionalStyles, onPress }: PlayerCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className={`flex-row items-center justify-between w-full p-4 my-3 rounded-lg shadow-md transition-transform transform hover:scale-105 
        ${attended ? 'bg-dacka-green dark:bg-green-800' : !attended ? 'bg-slate-200 dark:bg-dacka-dark-gray' : 'bg-slate-200 dark:bg-dacka-dark-gray'} 
        ${additionalStyles}`}
    >
      <View className="flex-row items-center space-x-4">
        <Image source={image} className="w-16 h-16 border-2 rounded-full shadow-sm border-slate-800 dark:border-white" />
        <View>
          <Text className="text-sm font-semibold tracking-wide uppercase text-dacka-dark-gray dark:text-white">{playerCardTexts.athlete}</Text>
          <Text className="text-lg font-bold text-dacka-dark-gray dark:text-white">{name}</Text>
        </View>
      </View>
      {attended !== undefined && (
        <Text className={`text-sm font-semibold px-2 py-1 rounded-full 
          ${attended ? 'text-green-900 bg-green-100 dark:text-green-100 dark:bg-green-900' : 'text-red-900 bg-red-100 dark:text-red-100 dark:bg-red-900'}`}
        >
          {attended ? 'Present' : 'Absent'}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default PlayerCard;