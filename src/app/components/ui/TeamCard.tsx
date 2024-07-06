import { TouchableOpacity, Text,View,Image } from 'react-native';
import React from 'react';

type TeamCardProps = {
  teamName: string,
  teamId: string,
  coachName: string,
  additionalStyles?: string,
  navigation?: () => void
}
const myImage = require('../../../../assets/user.png')

const TeamCard = ({ teamName, teamId, additionalStyles, navigation,coachName }: TeamCardProps) => {
  return (
    <TouchableOpacity 
      key={teamId} 
      className={`py-5 my-3 rounded-lg bg-slate-100 dark:bg-dacka-dark-gray w-full px-4 flex-row items-center justify-between ${additionalStyles}`}
      onPress={navigation}  // Directly use navigation prop here
    >
      <View>
        <View className='w-full my-1'>
          <Text className='text-xs font-medium text-dacka-dark-gray dark:text-white'>Team Name:</Text>
          <Text className='text-lg text-dacka-dark-gray dark:text-white'>{teamName}</Text>
        </View>

        <View className='w-full my-1'>
          <Text className='text-xs font-medium text-dacka-dark-gray dark:text-white'>Coach Name:</Text>
          <Text className='text-lg text-dacka-dark-gray dark:text-white'>{coachName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TeamCard;
