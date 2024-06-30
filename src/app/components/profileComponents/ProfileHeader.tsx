import { View, Text, Image,TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import IconBar from './IconBar';
import { useLogoutMutation } from '../../../features/query/authQueryService';

const ProfileHeader = ({isProfilePage}) => {
  const user = useSelector((state: RootState) => getAuthUser(state));

  const myImage = require('../../../../assets/user.png')
  const [logout] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			const response = await logout({}).unwrap();
			console.log(response);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

  if(!isProfilePage){
    return (
      <>
            <View className='h-1/3'>
      <View className="w-full h-5/6">
        <View className='w-full h-4/6 rounded-b-[38px] bg-dacka-green'/>
          <View className='w-1/2 h-full mx-auto -mt-24 overflow-hidden rounded-full bg-dacka-dark-gray'>
            <Image
              source={myImage}
              style={{width: '100%', height: '150%'}}
              resizeMode="cover"/>
          </View>
        <View className="absolute right-4 top-3">
          
        </View>
        <View className='absolute top-4 left-5'>
          
        </View>
      </View>
    </View>
    <View>
      <Text className="text-xl font-semibold text-center text-white">{user?.name}</Text>
    </View>
      </>
    )
  }

  return (
  <>
    <View className='h-1/3'>
      <View className="w-full h-5/6">
        <View className='w-full h-4/6 rounded-b-[38px] bg-dacka-green'/>
          <View className='w-1/2 h-full mx-auto -mt-24 overflow-hidden rounded-full bg-dacka-dark-gray'>
            <Image
              source={myImage}
              style={{width: '100%', height: '150%'}}
              resizeMode="cover"/>
          </View>
        <View className="absolute right-4 top-3">
          <IconBar>
            <View className="items-center justify-center w-10 h-10">
              <MaterialIcons name="settings" size={24} opacity={0.5} color="black" />
            </View>
            <TouchableOpacity
              className="items-center justify-center w-10 h-10"
              onPress={handleLogout}
            >
              <FontAwesome name="sign-out" size={24} opacity={0.5} color="black" />
            </TouchableOpacity>
          </IconBar>
        </View>
        <View className='absolute top-4 left-5'>
          <IconBar>
            <FontAwesome
              name="pencil-square"
              size={24}
              opacity={0.5}
              color="black"
            />
          </IconBar>
        </View>
      </View>
    </View>
    <View>
      <Text className="text-xl font-semibold text-center text-white">{user?.name}</Text>
    </View>
  </>
  )
}

export default ProfileHeader