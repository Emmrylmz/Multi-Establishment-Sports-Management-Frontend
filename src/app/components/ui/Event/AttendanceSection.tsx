// AttendanceSection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlayerCard from '../PlayerCard';

interface AttendanceSectionProps {
  hasEventPassed: boolean;
  mergedData: any[];
}

const AttendanceSection: React.FC<AttendanceSectionProps> = React.memo(({
  hasEventPassed,
  mergedData,
}) => {
  const navigation = useNavigation();

  const handleNavigateUserDetails = (userId: string) => {
    const selectedUser = mergedData.find(user => user._id === userId);
    navigation.navigate('ProfileContainer', { user: selectedUser });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#4a90e2' }}>
        {hasEventPassed ? 'Attendance Table' : 'Team Players'}
      </Text>
      {mergedData.map((user) => (
        <PlayerCard
          key={user._id}
          id={user._id}
          name={user.name}
          image={user.image}
          attended={user.attended}
          onPress={() => handleNavigateUserDetails(user._id)}
        />
      ))}
    </View>
  );
});

export default AttendanceSection;
