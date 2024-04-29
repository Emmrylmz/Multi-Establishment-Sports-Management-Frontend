import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

type TeamCardProps = {
  teamName: string,
  teamId: number,
  additionalStyles?: string,
  navigation: () => void
}

const TeamCard = ({ teamName, teamId, additionalStyles, navigation }: TeamCardProps) => {
  return (
    <TouchableOpacity 
      key={teamId} 
      className={`py-5 my-3 rounded-lg bg-dacka-gray ${additionalStyles}`}
      onPress={navigation}  // Directly use navigation prop here
    >
      <Text className='text-center text-white'>{teamName}</Text>
    </TouchableOpacity>
  )
}

export default TeamCard;
