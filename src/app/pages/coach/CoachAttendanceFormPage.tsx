import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AppLayout, PlayerCard } from '../../components';
import { useGetTeamUsersByIdQuery } from '../../../features/query/teamQueryService';
import { useAddAttendancesToEventMutation } from '../../../features/query/eventQueryService';
import myImage from '../../../../assets/user.png';

const CoachAttendanceFormPage = ({ route, navigation }) => {
  const { team_id, event_id } = route.params;
  const event_type = 'training'; // Set event_type to 'training' for testing
  const { data: teamUsers, error, isLoading } = useGetTeamUsersByIdQuery(team_id);
  const [attendanceList, setAttendanceList] = React.useState<{ user_id: string; status: string; }[]>([]);
  const [addAttendancesToEvent, { isLoading: isSubmitting }] = useAddAttendancesToEventMutation();

  const handlePlayerToggle = (user_id: string) => {
    setAttendanceList((prevList) => {
      const playerIndex = prevList.findIndex((player) => player.user_id === user_id);
      if (playerIndex !== -1) {
        // Remove player if already selected
        const updatedList = [...prevList];
        updatedList.splice(playerIndex, 1);
        return updatedList;
      } else {
        // Add player if not selected
        return [...prevList, { user_id, status: 'present' }];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const attendances = teamUsers.map((user) => ({
        user_id: user._id,
        status: attendanceList.some((player) => player.user_id === user._id) ? 'present' : 'absent',
      }));

      const attendanceForm = {
        event_id,
        event_type,
        team_id,
        attendances,
      };

      await addAttendancesToEvent(attendanceForm).unwrap();
      alert('Attendance successfully submitted!');
    } catch (error) {
      console.error('Failed to submit attendance:', error);
      alert('Failed to submit attendance');
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching team users: {error.message}</Text>;
  }

  return (
    <AppLayout>
      <ScrollView style={{ flex: 1 }}>
        {teamUsers?.map((user) => (
          <PlayerCard
            key={user._id}
            name={user.name}
            dateOfBirth='19-05-2002'
            image={myImage}
            selected={attendanceList.some((player) => player.user_id === user._id)}
            onPress={() => handlePlayerToggle(user._id)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          width: '100%',
          padding: 16,
          marginTop: 16,
          borderRadius: 8,
          backgroundColor: isSubmitting ? '#888' : '#0f0', // Adjust colors as needed
          alignItems: 'center',
        }}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>
          {isSubmitting ? 'Submitting...' : 'Set selected users as attended'}
        </Text>
      </TouchableOpacity>
    </AppLayout>
  );
};

export default CoachAttendanceFormPage;
