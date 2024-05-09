import { View, Text } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'

const EventDetailPage = ({route}) => {
  const {event_id,team_name,event_type} = route.params

  return (
    <AppLayout>
    <View>
      <Text className='text-white'>eventId: {event_id}</Text>
      <Text className='text-white'>team name: {team_name}</Text>
      <Text className='text-white'>event type: {event_type}</Text>
    </View>
    </AppLayout>
  )
}

export default EventDetailPage