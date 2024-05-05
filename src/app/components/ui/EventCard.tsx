import { View, Text } from 'react-native'
import React from 'react'

type EventCardProps = {
  type: 'Team training' | 'Meeting' | 'Personal training' | 'Weight lifting' | 'Game',
  date: string,
  time: string,
  coach: string,
  location: 'Ege Üni. Büyük S.S' | 'Ege Üni. Büyük S.S Üst Kat' | '50. Yıl Spor Salonu' | 'Spor Bil. Fak. Top. Sal.' | 'Spor Bil. Fak. Fitness Sal.' | 'Bornova Anadolu Lisesi' | 'Atletizm Pisti' ,
  team: string
}

const EventCard = ({type,date,time,coach,location,team}: EventCardProps) => {
  let typeColor = ''
  switch (type) {
    case 'Team training':
      typeColor = 'text-dacka-black'
      break
    case 'Meeting':
      typeColor = 'text-dacka-green'
      break
    case 'Personal training':
      typeColor = 'text-[#C3D036]'
      break
    case 'Weight lifting':
      typeColor = 'text-dacka-black'
      break
    case 'Game':
      typeColor = 'text-[#96BEEE]'
      break
    default:
      typeColor = 'text-dacka-dark-gray'
  }


  return (
    <View className='flex-row items-center justify-between w-full px-8 py-3 mt-3 bg-white rounded-lg'>
      <View className='w-1/2'>
        <Text className={`text-base font-semibold ${typeColor}`}>{type}</Text>
        <Text className='text-3xl font-extrabold text-dacka-gray'>{date}</Text>
        <Text className='text-base'>{time}</Text>
      </View>
      <View className='w-1/2'>
        <Text className='text-base font-semibold text-dacka-black'>{location}</Text>
        <Text className='text-base'>{team}</Text>
        <Text className='text-base'>{coach}</Text>
      </View>
    </View>
  )
}

export default EventCard