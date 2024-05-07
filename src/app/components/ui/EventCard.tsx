import { View, Text } from 'react-native'
import React from 'react'

type EventCardProps = {
  // type: 'Team training' | 'Meeting' | 'Personal training' | 'Weight lifting' | 'Game',
  type: string,
  date: string,
  time: string,
  coach: string,
  // location: 'Ege Üni. Büyük S.S' | 'Ege Üni. Büyük S.S Üst Kat' | '50. Yıl Spor Salonu' | 'Spor Bil. Fak. Top. Sal.' | 'Spor Bil. Fak. Fitness Sal.' | 'Bornova Anadolu Lisesi' | 'Atletizm Pisti' ,
  location: string,
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
    <View className='flex-row items-center justify-between bg-white rounded-3xl w-[350px] mx-3 px-4 py-5 max-h-24'>
      <View className='w-1/3'>
        <Text className={`text-sm font-semibold ${typeColor}`}>{type}</Text>
        <Text className='text-lg font-extrabold text-dacka-gray'>{date}</Text>
        <Text className='text-sm'>{time}</Text>
      </View>
      <View className='w-1/3'>
        <Text className='text-sm font-semibold text-dacka-black'>{location}</Text>
        <Text className='text-sm'>{team}</Text>
        <Text className='text-sm'>{coach}</Text>
      </View>
    </View>
  )
}

export default EventCard