import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import TeamCard from '../../components/ui/Team/TeamCard'
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useGetTeamInfoQuery } from '../../../features/query/teamQueryService'
import { getAuthUser } from '../../../features/auth/auth.slice'

const CoachTeamsPage = ({navigation}) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isLoading, isError } = useGetTeamInfoQuery(user?.teams);
  if (isLoading) {
    return <View><Text>Loading...</Text></View>;
  }
  if (isError || !data) {
    return <View><Text>Error loading teams.</Text></View>;
  }
  if(data.length === 0){
    return <View><Text>No team found</Text></View>
  }
  return (
    <AppLayout>
      <ScrollView className='w-full h-full' showsVerticalScrollIndicator={false}>
        {data.map((team) => (
          <TeamCard key={team._id} teamName={team.team_name} teamId={team._id} coachName={'Ahmet Köksal'}  navigation={() => navigation.navigate('TeamDetailPage',{team_id: team._id})} />))}
      </ScrollView>
    </AppLayout>
  )
}

export default CoachTeamsPage