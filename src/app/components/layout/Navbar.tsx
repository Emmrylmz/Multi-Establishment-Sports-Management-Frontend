import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { navbarTexts } from '../../../utils/constants/texts'
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

type NavbarProps = {
  name: string | undefined,
}
const Navbar = ({name}: NavbarProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View className='flex-row items-center justify-between w-full px-4 py-1 my-2'>
      <Text className='text-white'>{navbarTexts.greet}, {name}</Text>
      {/* <Text className='text-white'>{navbarTexts.logout}</Text> */}
      <TouchableOpacity onPress={() => navigation.navigate('CoachNotificationPage')}>
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default Navbar