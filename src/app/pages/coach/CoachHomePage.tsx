import { View, Text, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useListEventsQuery } from '../../../features/query/eventCreateService';
import AppLayout from '../../components/layout/AppLayout';
import EventCard from '../../components/ui/EventCard';
import { coachHomePageTexts } from '../../../utils/constants/texts';
import PagerView from 'react-native-pager-view';
import HomeWidget from '../../components/ui/HomeWidget';
import SearchBar from '../../components/ui/SearchBar';
import { MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
const eventData = [
  {
    type: 'Team training',
    date: '12.09.2021',
    time: '10:00',
    coach: 'John Doe',
    location: 'Ege Üni. Büyük S.S',
    team: 'U18 A',
    id: '1',
  },
  {
    type: 'Meeting',
    date: '12.09.2021',
    time: '10:00',
    coach: 'John Doe',
    location: 'Ege Üni. Büyük S.S',
    team: 'U18 A',
    id: '2',
  },
  {
    type: 'Personal training',
    date: '12.09.2021',
    time: '10:00',
    coach: 'John Doe',
    location: 'Ege Üni. Büyük S.S',
    team: 'U18 A',
    id: '3',
  },
  {
    type: 'Weight lifting',
    date: '12.09.2021',
    time: '10:00',
    coach: 'John Doe',
    location: 'Ege Üni. Büyük S.S',
    team: 'U18 A',
    id: '4',
  },
  {
    type: 'Game',
    date: '12.09.2021',
    time: '10:00',
    coach: 'John Doe',
    location: 'Ege Üni. Büyük S.S',
    team: 'U18 A',
    id: '5',
  }
];

const data = [
  {
    id: 1,
    component: <HomeWidget title='Calendar' />
  },
  {
    id: 2,
    component: <HomeWidget title='Teams' icon={<FontAwesome5 name="users" size={52} color="black" />}  />
  },
  {
    id: 3,
    component: <HomeWidget title='Deneme'  />
  }
]

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
  // const [showSearch, setShowSearch] = useState(false);
  // const handleScroll = (event) => {
  //   const y = event.nativeEvent.contentOffset.y;
  //   if (y < -100) { // Threshold for triggering the search bar
  //     setShowSearch(true);
  //   }
  // };
  // const handleScrollEnd = () => {
  //   setShowSearch(false);
  // };

  return (
    <AppLayout>
     
      {/* <SearchBar visible={showSearch} onClose={() => setShowSearch(false)} /> */}
      <View>
        <Text className='my-3 text-2xl text-center text-white shadow shadow-dacka-green'>{coachHomePageTexts.upcomingEvents}</Text>
        <FlatList
          className='max-h-32'
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={eventData}
          renderItem={({item}) => <EventCard type={item.type} time={item.time} coach={item.coach} location={item.location} date={item.date} team={item.team} />}
          keyExtractor={item => item.id}
        />
      </View>

      <FlatList
          className='my-3 max-h-32'
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => item.component}
        />

      <View className='flex-row items-center justify-between w-full'>
        <HomeWidget title='payment' additionalViewStyle='py-4 px-12' additionalTextStyle='text-base font-medium' icon={<MaterialIcons name="payment" size={24} color="black" />} />
        <HomeWidget title='coach note' additionalViewStyle='px-12 py-4' additionalTextStyle='text-base font-medium'  icon={<MaterialCommunityIcons name="whistle" size={24} color="black" />}  />
      </View>


      <View className='mt-12 bg-white rounded-[38px] p-4'>
        <Text className='my-3 text-xl text-center text-dacka-gray'>Player Progress</Text>
        <PagerView initialPage={0} scrollEnabled={true} useNext={true} overdrag={true} >
          <View className='bg-white rounded-[38px] p-12' key={1}>
            <Text className='text-center'>{coachHomePageTexts.upcomingEvents}</Text>
          </View>
          <View className='bg-white rounded-[38px] p-12' key={2}>
            <Text className='text-center'>{coachHomePageTexts.upcomingEvents}</Text>
          </View>
        </PagerView>
      </View>
    </AppLayout>
  );
}

export default CoachHomePage;
