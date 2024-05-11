import { View, ScrollView } from 'react-native'
import AppLayout from '../../components/layout/AppLayout'
import TeamCard from '../../components/ui/TeamCard'



const CoachSchedulePage = ({navigation}) => {

  type Team = {
    id: string,
    name: string,
  }
  type TeamsList = Team[]
  const teams: TeamsList = [
    { id: '1', name: 'U18 A' },
    { id: '2', name: 'U18 B' },
    { id: '3', name: 'U16 A' },
    { id: '4', name: 'U16 B' },
    { id: '5', name: 'U14 A' },
    { id: '6', name: 'U14 B' },
    { id: '7', name: 'U12 A' },
    { id: '8', name: 'U12 B' },
  ]

  return (
    <AppLayout>
      <View className='w-full h-full'>
        <ScrollView className='w-full'>
        {teams.map((team, index) => (
          <TeamCard
            teamName={team.name}
            teamId={team.id}
            coachName='Ahmet Köksal'
            key={index}
            navigation={() => navigation.navigate('CoachAddTrainingPage', { team_id: team.id })}
          />
        ))}
        </ScrollView>
      </View>
    </AppLayout>
  )
}

export default CoachSchedulePage