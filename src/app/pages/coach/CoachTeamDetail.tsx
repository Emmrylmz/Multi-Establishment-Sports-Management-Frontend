import { View, Text, ScrollView,Image } from 'react-native'
import React from 'react'
import AppLayout from '../../components/AppLayout'
import PlayerCard from '../../components/PlayerCard'
import { ImageSourcePropType } from 'react-native'

const CoachTeamDetail = ({ route,navigation }) => {
  type Player = {
    name: string,
    surname: string,
    email: string,
    password: string,
    phone_number: string,
    image: ImageSourcePropType,
    dateOfBirth: string
  }
  const [team, setTeam] = React.useState<Player[]>([
    {
      name: 'Ahmet',
      surname: 'Köksal',
      email: 'hmetkoksal@gmail.com',
      password: "ahmetkoksal123",
      phone_number: '+90 (532) 123 45 67',
      image: require('../../../../assets/profile_pic.jpg'),
      dateOfBirth: '12.12.1999'
    },
    {
      name: 'Mehmet',
      surname: 'Köksal',
      email: 'mehmetkoksal@gmail.com',
      password: "mehmetkoksal123",
      phone_number: '+90 (532) 123 45 67',
      image: require('../../../../assets/profile_pic.jpg'),
      dateOfBirth: '12.12.1999'
    },
    {
      name: 'Ali',
      surname: 'Köksal',
      email: 'alikoksal@gmail.com',
      password: "alikoksal123",
      phone_number: '+90 (532) 123 45 67',
      image: require('../../../../assets/profile_pic.jpg'),
      dateOfBirth: '12.12.1999'
    },
    {
      name: 'Veli',
      surname: 'Köksal',
      email: 'velikoksal@gmail.com',
      password: "velikoksal123",
      phone_number: '+90 (532) 123 45 67',
      image: require('../../../../assets/profile_pic.jpg'),
      dateOfBirth: '12.12.1999'
    },
  ])
  const {team_id} = route.params
  console.log(team_id)
  return (
    <AppLayout>
      <Text className='text-white'>CoachTeamDetail</Text>
      <Text className='text-white'>team_id: {team_id}</Text>
      <ScrollView className='w-full h-[60%]'>
        {team.map((player, index) => (
          <PlayerCard key={index} name={player.name} dateOfBirth={player.dateOfBirth} image={player.image} />
        ))}
      </ScrollView>
    </AppLayout>
  )
}

export default CoachTeamDetail