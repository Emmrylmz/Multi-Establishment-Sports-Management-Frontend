import { View, Text } from 'react-native'
import React from 'react'
import AppLayout from '../../components/AppLayout'


const CoachTeamDetail = ({ route }) => {
  const {team_id} = route.params
  console.log(team_id)
  return (
    <AppLayout>
      <Text className='text-white'>CoachTeamDetail</Text>
      <Text className='text-white'>team_id: {team_id}</Text>
    </AppLayout>
  )
}

export default CoachTeamDetail