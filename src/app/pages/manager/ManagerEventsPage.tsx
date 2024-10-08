import { View, Text } from 'react-native'
import React from 'react'
import { AppLayout } from '../../components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EventList from '../../components/ui/Event/EventList'
import { ParamListBase } from '@react-navigation/native';

type ManagerEventsPageProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const ManagerEventsPage = ({navigation}:ManagerEventsPageProps) => {
  return (
      <View className="w-full h-full bg-white dark:bg-dacka-black">
        {/* <EventList  teamEvents={[]} navigation={navigation} orientation="vertical" /> */}
      </View>
  )
}

export default ManagerEventsPage