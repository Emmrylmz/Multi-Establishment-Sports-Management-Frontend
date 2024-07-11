import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const [logout, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile', screen: 'EditProfile' },
    { icon: 'cog', label: 'Settings', screen: 'Settings' },
    { icon: 'shield-account', label: 'Privacy', screen: 'Privacy' },
    { icon: 'help-circle', label: 'Help & Support', screen: 'HelpSupport' },
  ];

  const handleMenuItemPress = (screen: string) => {
    onClose();
    navigation.navigate(screen);
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
      className="absolute top-0 left-0 bottom-0 bg-white shadow-lg rounded-tr-3xl rounded-br-3xl overflow-hidden z-50"
      style={{
        width: SIDEBAR_WIDTH,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <LinearGradient
        colors={['#00897B', '#3FA454']}
        className="pt-12 pb-6 px-4 rounded-br-3xl"
      >
        <TouchableOpacity onPress={onClose} className="absolute top-12 right-4 z-10">
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View className="items-center">
          {userPhoto ? (
            <Image
              source={{ uri: userPhoto }}
              className="w-24 h-24 rounded-full border-2 border-white mb-4"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4">
              <Text className="text-4xl font-bold text-teal-600">
                {userName.charAt(0)}
              </Text>
            </View>
          )}
          <Text className="text-xl font-bold text-white mb-1">{userName}</Text>
          <Text className="text-sm text-gray-200">{userEmail}</Text>
        </View>
      </LinearGradient>
      <View className="flex-1 pt-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            className="flex-row items-center px-6 py-4 border-b border-gray-100"
            onPress={() => handleMenuItemPress(item.screen)}
          >
            <Icon name={item.icon} size={24} color="#00897B" />
            <Text className="ml-4 text-lg text-gray-800">{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          className="flex-row items-center px-6 py-4 border-b border-gray-100"
          onPress={handleLogout}
          disabled={isLoading}
        >
          <Icon name="logout" size={24} color="#FF3B30" />
          <Text className="ml-4 text-lg text-red-500">
            {isLoading ? 'Logging out...' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="pb-8 px-6">
        <Text className="text-sm text-gray-500 text-center">
          App Version 1.0.0
        </Text>
      </View>
    </Animated.View>
  );
};

export default ProfileSidebar;