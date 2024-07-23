import { View, Text, useColorScheme, ScrollView} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '../../components';
import { Ionicons } from '@expo/vector-icons';
import MenuItems from '../../components/ui/personalTraining/MenuItems';

const CoachPtPage = ({ navigation }) => {
  const isDark = useColorScheme() === 'dark';
  const { t } = useTranslation();


  return (
    <AppLayout>
      <View className='flex-row items-center justify-start w-full mb-6'>
        <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} onPress={() => navigation.goBack()} />
        <Text className="ml-4 text-2xl font-bold text-black dark:text-white">{t("ptPage.title")}asdasd</Text>
      </View>
      
      <ScrollView className='w-full'>
        <View className="flex-row flex-wrap justify-between">
          {menuItems.map((item, index) => (
            <MenuItems key={index} title={item.title} icon={item.icon} navigation={() => navigation.navigate(item.navigation)} />
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
}

export default CoachPtPage;