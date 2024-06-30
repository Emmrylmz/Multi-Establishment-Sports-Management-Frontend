import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { AppLayout, PlayerCard } from '../../components'

const TeamDetailPage: React.FC = () => {
  const myImage = require('../../../../assets/user.png')
  const players = [
    {
      id: 1,
      name: 'John Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 2,
      name: 'Jane Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 3,
      name: 'John Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 4,
      name: 'Jane Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 5,
      name: 'John Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 6,
      name: 'Jane Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 7,
      name: 'John Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 8,
      name: 'Jane Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 9,
      name: 'John Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 10,
      name: 'Jane Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 11,
      name: 'John Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    },
    {
      id: 12,
      name: 'Jane Doe',
      dateOfBirth: '12/12/1992',
      image: myImage,
      isAdded: false
    }
  ]
  return (
    <AppLayout>
      <ScrollView className="w-full h-full">
        <View className='flex-col items-center'>
          {players.map((player) => (
            <PlayerCard key={player.id} name={player.name} dateOfBirth={player.dateOfBirth} image={player.image} isAdded={player.isAdded} addUserToAttendanceList={() => { }} removeUserFromAttendanceList={() => { }} />
          ))}
        </View>

      </ScrollView>
    </AppLayout>
  )
}

export default TeamDetailPage