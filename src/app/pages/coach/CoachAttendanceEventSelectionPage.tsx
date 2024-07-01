import { View, Text } from 'react-native'
import React from 'react'
import { AppLayout } from '../../components'
import EventList from '../../components/ui/Event/EventList'

const CoachAttendanceEventSelectionPage = ({navigation,route}) => {
  const {team_id} = route.params
  console.log('team id at selection page: ',team_id)
  return (
    <AppLayout>
      <Text className='text-3xl text-white'>CoachAttendanceEventSelectionPage</Text>
      <EventList orientation='vertical' navigation={navigation} team_id={team_id} />
    </AppLayout>
  )
}

export default CoachAttendanceEventSelectionPage