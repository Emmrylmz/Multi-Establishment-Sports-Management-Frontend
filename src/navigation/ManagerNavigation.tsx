import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManagerHomePage from '../app/pages/manager/ManagerHomePage';
import TabBarIcon from '../app/components/tabs/tabBarIcon';
import ManagerPaymentPage from '../app/pages/manager/ManagerPaymentPage';
import ProfilePage from '../app/pages/common/ProfilePage';
import ManagerEventsPage from '../app/pages/manager/ManagerEventsPage';
import ManagerTeamsPage from '../app/pages/manager/ManagerTeamsPage';
import CoachTeamsPage from '../app/pages/coach/CoachTeamsPage';
import { useColorScheme } from 'react-native';
import EventDetailPage from '../app/pages/common/EventDetailPage';
import MangerPlayerPaymentDetailPage from '../app/pages/manager/MangerPlayerPaymentDetailPage';
import PlayerDetailPage from '../app/pages/common/PlayerDetailPage';

const HomeStack = createNativeStackNavigator();

function ManagerHomeStackScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
        headerBackTitle: 'Back',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: isDarkMode ? '#101010' : '#fff',
        },
        headerTitleStyle: {
          color: isDarkMode ? '#fff' : '#000',
        },
      }}
    >
      <HomeStack.Screen name="ManagerHomePage" options={{ title: 'Home Page' }} component={ManagerHomePage} />
      <HomeStack.Screen name="EventDetailPage" options={{ title: 'Event Detail' }} component={EventDetailPage} />
      <HomeStack.Screen name='PlayerDetailPage' component={PlayerDetailPage} />
      <HomeStack.Screen name='ManagerPlayerPaymentDetailPage' component={MangerPlayerPaymentDetailPage}/>
    </HomeStack.Navigator>
  );
}

const ManagerNavigation = () => {
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="ManagerHomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon routeName={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
        tabBarInactiveTintColor: '#919191',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#101010' : '#fff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: true,
        headerBackTitle: 'Back',
        headerTintColor: isDarkMode ? '#fff' : '#000',
        headerStyle: {
          backgroundColor: isDarkMode ? '#101010' : '#fff',
        },
        headerTitleStyle: {
          color: isDarkMode ? '#fff' : '#000',
        },
      })}
    >
      <Tab.Screen name="ManagerHomeStack" options={{ headerShown: false, title: 'Home' }} component={ManagerHomeStackScreen} />
      <Tab.Screen name="ManagerTeamsPage" options={{ title: 'Teams List' }} component={CoachTeamsPage} />
      <Tab.Screen name="ManagerEventsPage" options={{ title: 'Events' }} component={ManagerEventsPage} />
      <Tab.Screen name="ManagerPaymentPage" options={{ title: 'See Payments' }} component={ManagerPaymentPage} />
      <Tab.Screen name="ManagerProfilePage" options={{ title: 'Profile' }} component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default ManagerNavigation;