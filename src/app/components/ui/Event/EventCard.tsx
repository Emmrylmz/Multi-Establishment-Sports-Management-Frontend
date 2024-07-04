import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type EventCardProps = {
  // type: 'Team training' | 'Meeting' | 'Personal training' | 'Weight lifting' | 'Game',
  event_type: string,
  start_datetime: string,
  end_datetime: string,
  creator_id: string,
  // location: 'Ege Üni. Büyük S.S' | 'Ege Üni. Büyük S.S Üst Kat' | '50. Yıl Spor Salonu' | 'Spor Bil. Fak. Top. Sal.' | 'Spor Bil. Fak. Fitness Sal.' | 'Bornova Anadolu Lisesi' | 'Atletizm Pisti' ,
  place: string,
  team_id: string,
  onPress?: () => void
}

// const EventCard = ({event_type,event_date,creator_id,place,team_id,onPress}: EventCardProps) => {
//   let typeColor = ''
//   switch (event_type) {
//     case 'Team training':
//       typeColor = 'text-dacka-black'
//       break
//     case 'Meeting':
//       typeColor = 'text-dacka-green'
//       break
//     case 'Personal training':
//       typeColor = 'text-[#C3D036]'
//       break
//     case 'Weight lifting':
//       typeColor = 'text-dacka-black'
//       break
//     case 'Game':
//       typeColor = 'text-[#96BEEE]'
//       break
//     default:
//       typeColor = 'text-dacka-dark-gray'
//   }


  return (
    <TouchableOpacity className='flex-row items-center justify-between bg-white rounded-3xl w-[350px] mx-3 px-4 py-5 max-h-24' onPress={onPress}>
      <View className='w-1/3'>
        <Text className={`text-sm font-semibold ${typeColor}`}>{event_type}</Text>
        <Text className='text-lg font-extrabold text-dacka-gray'>{start_datetime}</Text>
      </View>
      <View className='w-1/3'>
        <Text className='text-sm font-semibold text-dacka-black'>{place}</Text>
        <Text className='text-sm'>{team_id}</Text>
        <Text className='text-sm'>{creator_id}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default EventCard