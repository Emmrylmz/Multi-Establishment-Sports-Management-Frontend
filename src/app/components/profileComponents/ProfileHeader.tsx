import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import IconBar from './IconBar';

const ProfileHeader = () => {
  const user = useSelector((state: RootState) => getAuthUser(state));

  return (
    <View className="fixed h-2/6  w-full">
      <Image
        className="rounded-b-3xl "
        source={{ uri: user?.photo }}
        style={{ flex: 1 }}
        resizeMode="cover"
      />
      <View className="absolute -left-2 top-10 h-10  w-full items-end">
        <IconBar />
      </View>

      <View className="absolute bottom-7 left-10 ">
        <Text className="text-xl font-semibold text-white">{user?.name}</Text>
      </View>
    </View>
  )
}

export default ProfileHeader