import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useListEventsQuery } from '../../../features/query/eventCreateService';
import AppLayout from '../../components/layout/AppLayout';
import EventCard from '../../components/ui/EventCard';
import { coachHomePageTexts } from '../../../utils/constants/texts';

const CoachHomePage = () => {

  /*
    !WHEN THE BACKEND IS READY, UNCOMMENT THE CODE BELOW TO FETCH EVENTS
  */

  // const { data: events, error, isLoading } = useListEventsQuery('asd');
  // console.log(events)

  // if (isLoading) {
  //   return (
  //     <AppLayout>
  //       <Text className='text-2xl text-center text-white'>Loading...</Text>
  //     </AppLayout>
  //   );
  // }

  // if (error) {
  //   return (
  //     <AppLayout>
  //       <Text className='text-2xl text-center text-white'>Error fetching events</Text>
  //     </AppLayout>
  //   );
  // }

  return (
    <AppLayout>
      <Text className='mt-4 text-2xl font-semibold text-center text-white shadow-md shadow-dacka-green'>{coachHomePageTexts.upcomingEvents}</Text>
      <ScrollView className='w-full h-[60%] my-3 py-4' >
        {/* {events?.map((event, index) => (
          <View key={index} className='p-4 m-2 bg-white rounded-lg shadow-md'>
            <Text className='text-lg font-semibold'>{event.name}</Text>
            <Text>{event.description}</Text>
            <Text>{new Date(event.date).toLocaleDateString()}</Text>
          </View>
        ))} */}
        <EventCard type='Team training' date='19 MAY' time='12.30' location='Spor Bil. Fak. Fitness Sal.' team='U18 A' coach='Ahmet Koksal' />
        <EventCard type='Meeting' date='19 MAY' time='12.30' location='Spor Bil. Fak. Fitness Sal.' team='U18 A' coach='Ahmet Koksal' />
        <EventCard type='Game' date='19 MAY' time='12.30' location='Spor Bil. Fak. Fitness Sal.' team='U18 A' coach='Ahmet Koksal' />
        <EventCard type='Personal training' date='19 MAY' time='12.30' location='Spor Bil. Fak. Fitness Sal.' team='U18 A' coach='Ahmet Koksal' />
      </ScrollView>
    </AppLayout>
  );
}

export default CoachHomePage;
