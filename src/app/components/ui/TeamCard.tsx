import { TouchableOpacity, Text,View } from 'react-native';
import React from 'react';

type TeamCardProps = {
  teamName: string,
  teamId: string,
  coachName: string,
  additionalStyles?: string,
  navigation: () => void
}

const TeamCard = ({ teamName, teamId, additionalStyles, navigation,coachName }: TeamCardProps) => {
  return (
    <TouchableOpacity 
      key={teamId} 
      className={`py-5 my-3 rounded-lg bg-dacka-gray w-full px-4 flex-col justify-between ${additionalStyles}`}
      onPress={navigation}  // Directly use navigation prop here
    >
      <View className='w-full my-1'>
        <Text className='text-xs font-medium text-dacka-dark-gray'>Team Name:</Text>
        <Text className='text-lg text-white'>{teamName}</Text>
      </View>

      <View className='w-full my-1'>
        <Text className='text-xs font-medium text-dacka-dark-gray'>Coach Name:</Text>
        <Text className='text-lg text-white'>{coachName}</Text>
      </View>
      
    </TouchableOpacity>
  )
}

export default TeamCard;
