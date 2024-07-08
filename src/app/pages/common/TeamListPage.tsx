import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import TeamCard from '../../components/ui/Team/TeamCard';
import { useGetTeamInfoQuery } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import {  NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define types for the props and state
type Team = {
  _id: string;
  team_name: string;
};


interface TeamListPageProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const TeamListPage: React.FC<TeamListPageProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isLoading, isError } = useGetTeamInfoQuery(user?.teams);

  if (isLoading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (isError || !data) {
    return <View><Text>Error loading teams.</Text></View>;
  }




  return (
    <AppLayout>
      
      <SafeAreaView className='w-full h-full '>
        <ScrollView className='w-full'>
          {data && data.map((team: Team) => (
            <TeamCard
              key={team._id}
              teamName={team.team_name}
              teamId={team._id}
              coachName='Ahmet Köksal'
              navigation={() => navigation.navigate('TeamDetail', { team_id: team._id })}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </AppLayout>
  );
};

export default TeamListPage;
