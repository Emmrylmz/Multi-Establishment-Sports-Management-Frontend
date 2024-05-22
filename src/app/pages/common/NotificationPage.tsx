import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';
import NotificationCard from '../../components/ui/NotificationCard';

type Notification = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const NotificationPage: React.FC = () => {
  const coachNotes: Notification[] = [
    { id: 1, title: 'Post Game Performance', description: 'You have played well in the last game. Keep up the good work!', date: '11.05.2024' },
    { id: 2, title: 'Training Schedule', description: 'Training will be held on 15.05.2024 at 10:00 AM', date: '11.05.2024' },
    { id: 3, title: 'Game Schedule', description: 'The next game will be held on 20.05.2024 at 15:00 PM', date: '9.05.2024' },
    { id: 5, title: 'Meeting Schedule', description: 'We will have a meeting before the game.', date: '9.05.2024' },
  ];

  const teamNews: Notification[] = [
    { id: 1, title: 'New Player', description: 'We have a new player in our team. Welcome!', date: '11.05.2024' },
    { id: 2, title: 'Training Schedule', description: 'Training will be held on 15.05.2024 at 10:00 AM', date: '11.05.2024' },
    { id: 3, title: 'New Coach', description: 'We have a new coach. Welcome!', date: '9.05.2024' },
    { id: 5, title: 'New Court Location', description: 'Tomorrow\'\s training will be held at 50. Yıl Spor Salonu', date: '9.05.2024' },
  ];

  const managerNotes: Notification[] = [
    { id: 1, title: 'Unpaid Monthly Subscription', description: 'Your payment is 3 days late. Please make your payment as soon as possible.', date: '11.05.2024' },
    { id: 2, title: 'Pre-season Camp', description: 'We will have a pre-season camp in Antalya. Please make your reservation.', date: '11.05.2024' },
    { id: 3, title: 'New Season Jersey', description: 'We have a new jersey for the new season. Please contact us for your size.', date: '9.05.2024' },
    { id: 5, title: 'New Season Schedule', description: 'The new season schedule has been announced. Please check it out.', date: '9.05.2024' },
  ];

  const allNotifications: Notification[][] = [coachNotes, teamNews, managerNotes];
  const [activeNotificationTab, setActiveNotificationTab] = React.useState<number>(0);

  // Group notifications by date within the active tab
  const groupedByDate = allNotifications[activeNotificationTab].reduce((acc: { [date: string]: Notification[] }, notification: Notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {});

  // Sorted dates for rendering
  const dates = Object.keys(groupedByDate).sort();

  const user = useSelector((state: RootState) => getAuthUser(state));
  return (
    <AppLayout>
      <View className='w-full h-full'>
      <View className='p-3 h-1/4'>
        <ScrollView horizontal={true} className='w-full'>
          <TouchableOpacity onPress={() => setActiveNotificationTab(0)} className='flex items-center justify-center px-12 mx-3 bg-white rounded-2xl'>
            <Text className='text-black'>Coach Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveNotificationTab(1)} className='flex items-center justify-center px-12 mx-3 bg-white rounded-2xl'>
            <Text className='text-black'>Team News</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveNotificationTab(2)} className='flex items-center justify-center px-12 mx-3 bg-white rounded-2xl'>
            <Text className='text-black'>Manager Notes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView>
        {dates.map(date => (
          <View key={date} className='p-3 mx-3 my-2 rounded-lg'>
            <Text className='mb-2 text-lg font-bold text-white '>{date}</Text>
            {groupedByDate[date].map((notification, index) => (
              <NotificationCard key={index} title={notification.title} description={notification.description} />
            ))}
          </View>
        ))}
      </ScrollView>
      {user?.role === 'Manager' || user?.role === 'Coach' && (
        <TouchableOpacity className='flex-row items-center justify-end mx-3 my-2'>
          <Text className='p-4 text-right text-white bg-dacka-dark-gray'>publish a notice</Text>
        </TouchableOpacity>
      )}
      </View>
    </AppLayout>
  );
};

export default NotificationPage;
