import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppLayout } from '../../components'
import { useAuthStatus } from '../../../hooks/useAuthStatus';

const TeamsPage:React.FC<{route: any,navigation:any}> = ({route,navigation}) => {
  const { user } = useAuthStatus();
  const teams = [
    {
      id: 1,
      name: 'U18 A',
    },
    {
      id: 2,
      name: 'U18 B'
    },
    {
      id: 3,
      name: 'U16 A'
    }
  ]
  return (
    <AppLayout>
      <ScrollView className="w-full h-full">
        <View className="flex flex-col items-center">
          <Text className="py-5 text-2xl font-bold text-white">Teams</Text>
          {teams.map(team => (
            <TouchableOpacity onPress={() => navigation.navigate('CoachTeamDetail',{teamId: team.id})} key={team.id} className="flex flex-row items-center justify-between w-full p-5 my-2 rounded-lg bg-dacka-dark-gray">
              <Text className="text-lg text-white">{team.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
        {user?.role === 'Player' ? <TouchableOpacity onPress={() => navigation.navigate('TeamCreationPage')}><Text className="text-right text-white">Create new team</Text></TouchableOpacity> : ''}
        {/* Change Player to Coach when it's done */}
    </AppLayout>
  )
}

export default TeamsPage