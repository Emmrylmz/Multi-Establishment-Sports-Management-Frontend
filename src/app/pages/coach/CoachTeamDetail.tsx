import { View, Text } from 'react-native'
import React from 'react'

const CoachTeamDetail = ({ route, navigation }) => {
  const {teamId} = route.params
  console.log(teamId)
  return (
    <View>
      <Text>CoachTeamDetail</Text>
    </View>
  )
}

export default CoachTeamDetail