import { View, Text, ScrollView, FlatList,RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useListEventsQuery } from '../../../features/query/eventCreateService';
import AppLayout from '../../components/layout/AppLayout';
import EventCard from '../../components/ui/EventCard';
import { coachHomePageTexts } from '../../../utils/constants/texts';
import PagerView from 'react-native-pager-view';
import HomeWidget from '../../components/ui/HomeWidget';
import SearchBar from '../../components/ui/SearchBar';
import { MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import BarChart from '../../components/charts/BarChart';
import CalendarPicker from "react-native-calendar-picker";
import LineChart from '../../components/charts/LineChart';

const CoachHomePage = ({navigation}) => {
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
  const [showSearch, setShowSearch] = useState(false);
  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y < -100) { // Threshold for triggering the search bar
      setShowSearch(true);
    }
  };
  const handleScrollEnd = () => {
    setShowSearch(false);
  };

  const eventData = [
    {
      type: 'Team training',
      date: '12.09.2021',
      time: '10:00',
      coach: 'John Doe',
      locationName: 'Ege Üni. Büyük S.S',
      coordinates:{
        latitude: 38.45601,
        longitude: 27.22860,
      },
      team: 'U18 A',
      id: '1',
    },
    {
      type: 'Meeting',
      date: '12.09.2021',
      time: '10:00',
      coach: 'John Doe',
      locationName: 'Spor Bil. Fak. Top. Sal',
      coordinates:{
        latitude: 38.4592692,
        longitude: 27.2225393,
      },
      team: 'U18 A',
      id: '2',
    },
    {
      type: 'Personal training',
      date: '12.09.2021',
      time: '10:00',
      coach: 'John Doe',
      locationName: '50. Yıl Spor Salonu',
      coordinates:{
        latitude: 38.4556555,
        longitude: 27.2111297,
      },
      team: 'U18 A',
      id: '3',
    },
    {
      type: 'Weight lifting',
      date: '12.09.2021',
      time: '10:00',
      coach: 'John Doe',
      locationName: 'Spor Bil. Fak. Fitness Sal.',
      coordinates:{
        latitude: 38.45601,
        longitude: 27.22860,
      },
      team: 'U18 A',
      id: '4',
    },
    {
      type: 'Game',
      date: '12.09.2021',
      time: '10:00',
      coach: 'John Doe',
      locationName: 'Bornova Anadolu Lisesi',
      coordinates:{
        latitude: 38.4484298,
        longitude: 27.2139406,
      },
      team: 'U18 A',
      id: '5',
    }
  ];

  const dates = [
    {
      id: 1,
      date: "2024-05-15T09:00:00.000Z"
    },
    {
      id: 2,
      date: "2024-05-16T09:00:00.000Z"
    },
    {
      id: 3,
      date: "2024-05-17T09:00:00.000Z"
    },
    {
      id: 4,
      date: "2024-05-18T09:00:00.000Z"
    },
    {
      id: 5,
      date: "2024-05-19T09:00:00.000Z"
    },
    {
      id: 6,
      date: "2024-06-20T09:00:00.000Z"
    },
  ]
  // const customDatesStyles = dates.map(date => ({
  //   date: date && date.date ? new Date(date.date) : new Date(), // Provides a fallback to the current date if date.date is undefined
  //   style: { backgroundColor: '#3FA454' },
  //   textStyle: { color: '#000' },
  // }));

  
  const data = [
    {
      id: 1,
      component: <View className='p-3 bg-white rounded-[38px]'>
        <CalendarPicker 
          width={200} 
          textStyle={{color:'#000',fontSize:12}}
          todayBackgroundColor='#000'
          todayTextStyle={{color:'#fff'}}
          onDateChange={(date) => console.log(date)}
          // customDatesStyles={customDatesStyles}
        />
      </View>
    },
    {
      id: 2,
      component: <HomeWidget title='Teams' icon={<FontAwesome5 name="users" color="black" size={64} />} clickable={true} onPress={() => navigation.navigate('CoachTeamsPage')}  />
    },
    {
      id: 3,
      component: <HomeWidget title='Deneme'  />
    }
  ];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <AppLayout>
      {/* <SearchBar visible={showSearch} onClose={() => setShowSearch(false)} /> */}
    
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl  tintColor="#fff" refreshing={refreshing} onRefresh={onRefresh} />}>
        <FlatList
        className='p-0 mt-3'
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={eventData}
          renderItem={({item}) => <EventCard type={item.type} time={item.time} coach={item.coach} location={item.locationName} date={item.date} team={item.team} onPress={() => navigation.navigate('EventDetailPage',{event_id: item.id,team_name: item.team,event_type:item.type, coordinates: item.coordinates,locationName:item.locationName})} />}
          keyExtractor={item => item.id}
        />

      <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          className='my-3'
          renderItem={({item}) => item.component}
        />
        <View className='flex-row items-center justify-between w-full'>
          <HomeWidget title='payment' onPress={() => navigation.navigate('PaymentPage')} clickable={true} additionalViewStyle='py-4 px-12' additionalTextStyle='text-base font-medium' icon={<MaterialIcons name="payment" size={24} color="black" />} />
          <HomeWidget title='coach note' additionalViewStyle='px-12 py-4' additionalTextStyle='text-base font-medium'  icon={<MaterialCommunityIcons name="whistle" size={24} color="black" />}  />
        </View>

      <View className='bg-white rounded-[38px] h-[300px] my-3'>
        <Text className='text-xl text-center text-dacka-gray'>Player Progress</Text>
        <PagerView initialPage={0} scrollEnabled={true} overdrag={true}  >
          <BarChart key={1}/>
          <LineChart key={2}/>
        </PagerView>
      </View>
      </ScrollView>
    </AppLayout>
  );
}

export default CoachHomePage;
