import React, { useRef, memo } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import HeaderComponent from './HeaderComponent';
import { ParamListBase, RouteProp } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = SCREEN_HEIGHT * 0.4;

type UserProfilePageProps = {
  route: RouteProp<ParamListBase, 'ProfileContainer'>;
};

const ProfileContainer: React.FC<UserProfilePageProps> = ({ user }) => {
  const { t } = useTranslation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const stats = [
    {
      icon: 'calendar-check',
      label: 'profilePage.events',
      value: user?.total_training_events || 0,
    },
    { icon: 'trophy', label: 'profilePage.games', value: user?.total_game_events || 0 },
    { icon: 'account-group', label: 'profilePage.team', value: 'All-Stars' },
  ];

  const renderStatsCard = () => (
    <View className="p-5 mb-5 bg-white shadow-md dark:bg-dacka-black rounded-2xl">
      <View className="flex-row justify-between">
        {stats.map((stat, index) => (
          <View key={index} className="items-center flex-1">
            <Icon name={stat.icon} size={24} color={colorScheme === 'dark' ? '#60a5fa' : '#4ca2d5'} />
            <Text className="mt-1 text-2xl font-bold text-gray-800 dark:text-gray-200">{stat.value}</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t(stat.label)}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderInfoCard = (title, data) => (
    <View className="p-5 mb-5 bg-white shadow-md dark:bg-dacka-black rounded-2xl">
      <Text className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">{t(title)}</Text>
      {data.map((item, index) => (
        <View key={index} className="flex-row justify-between py-2.5 border-b border-gray-100 dark:border-gray-700">
          <Text className="text-base text-gray-500 dark:text-gray-400">{t(item.label)}</Text>
          <Text className="text-base font-medium text-teal-600 dark:text-teal-400">{item.value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 dark:bg-dacka-black">
      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View className="p-5">
          {user && renderStatsCard()}
          {renderInfoCard('profilePage.personalInfo', [
            { label: 'profilePage.age', value: user?.age },
            { label: 'profilePage.height', value: `${user?.height} cm` },
            { label: 'profilePage.weight', value: `${user?.weight} kg` },
          ])}
          {renderInfoCard('profilePage.performance', [
            {
              label: 'profilePage.trainingAttendance',
              value: `${user?.training_attendance_ratio || 0}%`,
            },
            {
              label: 'profilePage.gameAttendance',
              value: `${user?.game_attendance_ratio || 0}%`,
            },
          ])}
        </View>
      </Animated.ScrollView>
      <HeaderComponent scrollY={scrollY} user={user} />
    </View>
  );
};

export default memo(ProfileContainer);