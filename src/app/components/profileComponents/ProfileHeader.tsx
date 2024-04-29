import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import IconBar from './IconBar';

const ProfileHeader = () => {
  const user = useSelector((state: RootState) => getAuthUser(state));

  const myImage = require('../../../../assets/profile_pic.jpg')
  return (
    <View className="fixed w-full h-2/6">
      <Image
        className="rounded-b-3xl "
        source={myImage}
        style={{ flex: 1,width: '100%', height: '100%'}}
        resizeMode="cover"
        
      />
      <View className="absolute items-end w-full h-10 -left-2 top-10">
        <IconBar />
      </View>

      <View className="absolute bottom-7 left-10 ">
        <Text className="text-xl font-semibold text-white">{user?.name}</Text>
      </View>
    </View>
  )
}

export default ProfileHeader