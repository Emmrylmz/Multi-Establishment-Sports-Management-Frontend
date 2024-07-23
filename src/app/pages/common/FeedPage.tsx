import React, { useMemo, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const FeedPage = () => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const [posts, setPosts] = useState([
    { id: '1', user: { type: 'Coach', name: 'Coach A', team: '66800f9cc5e4ed61fc5fba2f' }, image: 'https://picsum.photos/id/1/300/200', timestamp: '2h ago' },
    { id: '2', user: { type: 'Manager', name: 'Manager B' }, image: 'https://picsum.photos/id/2/300/200', timestamp: '4h ago' },
    { id: '3', user: { type: 'Coach', name: 'Coach C', team: '6683da1449760fc82bdcb1f4' }, image: 'https://picsum.photos/id/3/300/200', timestamp: '1d ago' },
    { id: '4', user: { type: 'Manager', name: 'Manager D' }, image: 'https://picsum.photos/id/4/300/200', timestamp: '2d ago' },
  ]);

  const filteredPosts = useMemo(() => {
    if (user.role === 'Manager') {
      return posts;
    } else if (user.role === 'Coach' || user.role === 'Player') {
      return posts.filter(post => 
        post.user.type === 'Manager' || user.teams.includes(post.user.team)
      );
    }
    return [];
  }, [user, posts]);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
        return false;
      }
    }
    return true;
  };

  const handleImageUpload = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePickerResult(result);
  };

  const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePickerResult(result);
  };

  const handleImagePickerResult = (result) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      addNewPost(result.assets[0].uri);
    } else {
      console.log('Image picker cancelled or failed');
    }
  };

  const addNewPost = (imageUri) => {
    const newPost = {
      id: Date.now().toString(),
      user: { type: user.role, name: user.name, team: user.teams[0] },
      image: imageUri,
      timestamp: 'Just now'
    };
    setPosts([newPost, ...posts]);
  };

  const renderPost = ({ item }) => (
    <View className="mb-4 overflow-hidden bg-white rounded-lg shadow-md">
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
          <View className="items-center justify-center w-10 h-10 mr-3 bg-blue-500 rounded-full">
            <Text className="text-lg font-bold text-white">{item.user.name[0]}</Text>
          </View>
          <View>
            <Text className="font-bold text-gray-800">{item.user.name}</Text>
            <Text className="text-sm text-gray-600">{item.user.type}{item.user.team && ` - ${item.user.team}`}</Text>
          </View>
        </View>
        <Text className="text-sm text-gray-500">{item.timestamp}</Text>
      </View>
      <Image source={{ uri: item.image }} className="w-full h-48" />
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-white border-b border-gray-200">
        <Text className="p-4 text-2xl font-bold text-gray-800">Feed</Text>
      </View>
      {(user.role === 'Coach' || user.role === 'Manager') && (
        <View className="flex-row justify-around p-4 bg-white border-b border-gray-200">
          <TouchableOpacity onPress={handleCameraLaunch} className="flex-row items-center px-4 py-2 bg-blue-500 rounded-md">
            <Ionicons name="camera-outline" size={24} color="white" />
            <Text className="ml-2 font-semibold text-white">Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageUpload} className="flex-row items-center px-4 py-2 bg-green-500 rounded-md">
            <Ionicons name="image-outline" size={24} color="white" />
            <Text className="ml-2 font-semibold text-white">Upload Photo</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  )
}

export default FeedPage