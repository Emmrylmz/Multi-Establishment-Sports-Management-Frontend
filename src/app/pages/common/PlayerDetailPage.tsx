import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { AppLayout, ProfileHeader } from '../../components';
import { useGetUserInfoQuery } from '../../../features/query/userInfoQueryService';

const PlayerDetailPage = ({ route }) => {
  const { player_id } = route.params;
  const { data: userInfo, error, isLoading } = useGetUserInfoQuery(player_id);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching player details: {error.message}</Text>;
  }

  return (
    <AppLayout>
      <ProfileHeader isProfilePage={false} />
      <View className='flex-1 w-10/12 p-4 mx-auto rounded-3xl bg-dacka-dark-gray'>
        <ScrollView>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Player Details</Text>
          {userInfo.photo && <Image source={{ uri: userInfo.photo }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />}
          <Text style={{ color: 'white', marginBottom: 5 }}>Name: {userInfo.name}</Text>
          <Text style={{ color: 'white', marginBottom: 5 }}>Age: {userInfo.age}</Text>
          <Text style={{ color: 'white', marginBottom: 5 }}>Height: {userInfo.height}</Text>
          <Text style={{ color: 'white', marginBottom: 5 }}>Weight: {userInfo.weight}</Text>
          {userInfo.contact_info.map((contact, index) => (
            <Text key={index} style={{ color: 'white', marginBottom: 5 }}>Phone: {contact.phone}</Text>
          ))}
          <Text style={{ color: 'white', marginBottom: 5 }}>Created At: {userInfo.created_at}</Text>
          <Text style={{ color: 'white', marginBottom: 5 }}>Bool: {userInfo.bool ? 'True' : 'False'}</Text>
        </ScrollView>
      </View>
    </AppLayout>
  );
};

export default PlayerDetailPage;
