import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import TeamCard from '../../components/ui/TeamCard';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { PlayerCard } from '../../components';
import myImage from '../../../../assets/user.png'
const CoachTeamsPage = ({ route, navigation }) => {
  const { team_id,from } = route.params;
  const { data: teamUsers, error, isLoading } = useGetTeamUsersByIdQuery(team_id);

  console.log(teamUsers)

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching team users: {error.message}</Text>;
  }

  function navigationFunction(user_id:string){
    if(from === 'manager'){
      return navigation.navigate('ManagerPlayerPaymentDetailPage',{player_id: user_id,team_id: team_id})
    }
    return navigation.navigate('PlayerDetailPage', { player_id: user_id })
  }

  return (
    <AppLayout>
      <ScrollView className='w-full h-full'>
        {teamUsers?.map((user) => (
          <PlayerCard
          id={user._id}
          key={user._id}
          name={user.name}
          dateOfBirth='19-05-2002'
          image={myImage}
          onPress={() => navigationFunction(user._id)}
        />
        ))}
      </ScrollView>
    </AppLayout>
  );
};

export default CoachTeamsPage;
