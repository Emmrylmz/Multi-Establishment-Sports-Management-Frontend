import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import TeamCard from '../../components/ui/TeamCard'
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useGetTeamUsersQuery } from '../../../features/query/teamQueryService'
import { getAuthUser } from '../../../features/auth/auth.slice'
const CoachAttendanceTeamsListPage = ({navigation}) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isLoading, isError } = useGetTeamUsersQuery(user?.teams);
  console.log('teams: ',data)
  if (isLoading) {
    return <View><Text>Loading...</Text></View>;
  }
  if (isError || !data) {
    return <View><Text>Error loading teams.</Text></View>;
  }
  return (
    <AppLayout>
      <ScrollView className='w-full h-full'>
        {data.map((team) => (
          <TeamCard key={team._id} teamName={team.team_name} teamId={team._id} coachName={'Ahmet Köksal'}  navigation={() => navigation.navigate('CoachAttendanceEventSelectionPage',{team_id: team._id})} />))}
      </ScrollView>
    </AppLayout>
  )
}

export default CoachAttendanceTeamsListPage