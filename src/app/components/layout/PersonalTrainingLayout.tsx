import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import AppLayout from './AppLayout'
import {
  useCoach_private_lessonsQuery,
  usePrivate_lessons_historyQuery,
  useApproved_private_lessonsQuery,
  useDeclined_private_lessonsQuery
} from '../../../features/query/personalTrainingService'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { getAuthUser } from '../../../features/auth/auth.slice'

const PersonalTrainingLayout = ({children}: {children: React.ReactNode}) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const [refreshing, setRefreshing] = React.useState(false);

  const { refetch: refetchCoachLessons } = useCoach_private_lessonsQuery(user?._id);
  const { refetch: refetchLessonsHistory } = usePrivate_lessons_historyQuery(user?._id);
  const { refetch: refetchApprovedLessons } = useApproved_private_lessonsQuery(user?._id);
  const { refetch: refetchDeclinedLessons } = useDeclined_private_lessonsQuery(user?._id);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchCoachLessons(),
        refetchLessonsHistory(),
        refetchApprovedLessons(),
        refetchDeclinedLessons()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchCoachLessons, refetchLessonsHistory, refetchApprovedLessons, refetchDeclinedLessons]);

  return (
    <AppLayout>
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {children}
      </ScrollView>
    </AppLayout>
  )
}

export default PersonalTrainingLayout