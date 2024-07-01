import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import TeamCard from '../../components/ui/TeamCard';
import { useGetTeamUsersQuery } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import {  NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

// Define types for the props and state
type Team = {
  _id: string;
  team_name: string;
};


interface CoachSchedulePageProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const CoachSchedulePage: React.FC<CoachSchedulePageProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isLoading, isError } = useGetTeamUsersQuery(user?.teams);

  // if (isLoading) {
  //   return <View><Text>Loading...</Text></View>;
  // }

  // if (isError || !data) {
  //   return <View><Text>Error loading teams.</Text></View>;
  // }

  const myTeams = [
    {
      _id: '1',
      team_name: 'U18 A',
    },
    {
      _id: '2',
      team_name: 'U18 B',
    },
    {
      _id: '3',
      team_name: 'U16 A',
    },
    {
      _id: '4',
      team_name: 'U16 B',
    },
  ]


  return (
    <AppLayout>
      <View className='w-full h-full'>
        <ScrollView className='w-full'>
          {data && data.map((team: Team) => (
            <TeamCard
              key={team._id}
              teamName={team.team_name}
              teamId={team._id}
              coachName='Ahmet Köksal'
              navigation={() => navigation.navigate('CoachAddTrainingPage', { team_id: team._id })}
            />
          ))}
        </ScrollView>
      </View>
    </AppLayout>
  );
};

export default CoachSchedulePage;
