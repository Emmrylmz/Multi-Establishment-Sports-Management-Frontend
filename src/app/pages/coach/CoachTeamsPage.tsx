import { View, Text,ScrollView, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import TeamCard from '../../components/ui/Team/TeamCard'
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useGetTeamInfoQuery } from '../../../features/query/teamQueryService'
import { getAuthUser } from '../../../features/auth/auth.slice'
import LoadingIndicator from '../../components/ui/fetch/LoadingIndicator';
import {useTranslation} from 'react-i18next';
import ErrorComponent from '../../components/ui/fetch/ErrorComponent';

const CoachTeamsPage = ({navigation}) => {
  const {t} = useTranslation();
  const isDark = useColorScheme() === 'dark';
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isLoading, isError,refetch } = useGetTeamInfoQuery(user?.teams);
  if (isLoading) {
    return <LoadingIndicator isLoading={isLoading} />;
  }
  if (isError || !data) {
    return <ErrorComponent onRetry={refetch} />;
  }
  if(data.length === 0){
    return <View><Text>{t("fetchMessages.noTeams")}</Text></View>
  }
  return (
    <AppLayout>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView className='w-full h-full' showsVerticalScrollIndicator={false}>
        {data.map((team) => (
          <TeamCard key={team._id} teamName={team.team_name} teamId={team._id} coachName={'Ahmet Köksal'}  navigation={() => navigation.navigate('TeamDetailPage',{team_id: team._id})} />))}
      </ScrollView>
    </AppLayout>
  )
}

export default CoachTeamsPage