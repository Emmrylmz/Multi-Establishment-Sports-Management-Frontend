import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import TeamCard from '../../components/ui/TeamCard'

const CoachTeamsPage = () => {
  const teams = [
    {
      teamName: 'U18 A',
      teamId: '1',
      coachName: 'John Doe',
    },
    {
      teamName: 'U18 B',
      teamId: '2',
      coachName: 'Jane Doe',
    },
    {
      teamName: 'U16 A',
      teamId: '3',
      coachName: 'John Doe',
    },
    {
      teamName: 'U16 B',
      teamId: '4',
      coachName: 'Jane Doe',
    }
  ]
  return (
    <AppLayout>
      <ScrollView className='w-full h-full'>
        {teams.map((team) => (
          <TeamCard key={team.teamId} teamName={team.teamName} teamId={team.teamId} coachName={team.coachName} />))}
      </ScrollView>
    </AppLayout>
  )
}

export default CoachTeamsPage