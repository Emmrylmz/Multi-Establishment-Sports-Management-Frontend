import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Animated, Dimensions, Image, Alert, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLogoutMutation } from '../../../features/query/authQueryService'; 


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name?: string;
    email?: string;
    photo?: string;
  };
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose, user }) => {
  const isDark = useColorScheme() === 'dark';
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const [logout, { isLoading }] = useLogoutMutation();
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang).then(() => {
      console.log('Language changed to:', newLang);
      forceUpdate();
    });
  };

  const menuItems = [
    { icon: "account-edit", label: t("profileSideBar.editProfile"), screen: 'EditProfile' },
    { icon: "cog-outline", label: t("profileSideBar.settings"), screen: 'Settings' },
    { icon: "shield", label: t("profileSideBar.Privacy"), screen: 'Privacy' },
    { icon: "help-circle", label: t("profileSideBar.helpAndSupport"), screen: 'HelpSupport' },
    { icon: "translate", label: t("profileSideBar.changeLanguage"), onPress: changeLanguage },
  ];
  const handleMenuItemPress = (screen?: string, customAction?: () => void) => {
    if (customAction) {
      return customAction();
    } else if (screen) {
      navigation.navigate(screen);
    }
    onClose();
  };
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      onClose();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
    }
  };


  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';
  const userPhoto = user?.photo;

  return (
    <Animated.View 
      className="absolute top-0 bottom-0 left-0 z-50 overflow-hidden bg-white shadow-lg dark:bg-dacka-dark-gray rounded-tr-3xl rounded-br-3xl"
      style={{
        width: SIDEBAR_WIDTH,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <LinearGradient
        colors={['#00897B', '#3FA454']}
        className="px-4 pt-12 pb-6 rounded-br-3xl"
      >
        <TouchableOpacity onPress={onClose} className="absolute z-10 top-12 right-4">
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View className="items-center">
          {userPhoto ? (
            <Image
              source={{ uri: userPhoto }}
              className="w-24 h-24 mb-4 border-2 border-white rounded-full"
            />
          ) : (
            <View className="items-center justify-center w-24 h-24 mb-4 bg-white rounded-full dark:bg-gray-700">
              <Text className="text-4xl font-bold text-teal-600 dark:text-teal-400">
                {userName.charAt(0)}
              </Text>
            </View>
          )}
          <Text className="mb-1 text-xl font-bold text-white">{userName}</Text>
          <Text className="text-sm text-gray-200">{userEmail}</Text>
        </View>
      </LinearGradient>
      <View className="flex-1 pt-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            className="flex-row items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700"
            onPress={() => handleMenuItemPress(item.screen, item.onPress)}
          >
            <MaterialCommunityIcons 
              name={item.icon} 
              size={24} 
              color={isDark ? '#fff' : '#000'}
              style={{ color: isDark ? '#fff' : '#000' }}
            />
            <Text className="ml-4 text-lg text-gray-800 dark:text-gray-100">{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          className="flex-row items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700"
          onPress={handleLogout}
          disabled={isLoading}
        >
          <MaterialCommunityIcons 
            name="logout" 
            size={24} 
            color="#FF3B30"
            style={{ color: '#FF3B30' }}
          />
          <Text className="ml-4 text-lg text-red-500">
            {isLoading ? t("profileSideBar.loggingOut") : t("profileSideBar.logout")}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-6 pb-8">
        <Text className="text-sm text-center text-gray-500 dark:text-gray-400">
          App Version 1.0.0
        </Text>
      </View>
    </Animated.View>
  );
};

export default ProfileSidebar;