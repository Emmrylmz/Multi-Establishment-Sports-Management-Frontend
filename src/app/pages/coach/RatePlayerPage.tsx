import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const skills = [
  { name: 'Dribbling', key: 'dribbling', icon: 'basketball-outline' },
  { name: 'Passing', key: 'passing', icon: 'swap-horizontal-outline' },
  { name: 'Shooting', key: 'shooting', icon: 'flame-outline' },
  { name: 'Playmaking', key: 'playmaking', icon: 'git-network-outline' },
  { name: 'Defense', key: 'defense', icon: 'shield-outline' },
  { name: 'Rebounding', key: 'rebounding', icon: 'repeat-outline' },
];

const RatePlayerPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { player_id, event_id, player_name, event_name } = route.params;

  const [ratings, setRatings] = useState(
    Object.fromEntries(skills.map(skill => [skill.key, 5]))
  );
  const [overallRating, setOverallRating] = useState(5);
  const [animation] = useState(new Animated.Value(0));

  const handleSliderChange = useCallback((skill, values) => {
    setRatings(prev => {
      const newRatings = { ...prev, [skill]: values[0] };
      const average = Object.values(newRatings).reduce((a, b) => a + b) / skills.length;
      setOverallRating(Math.round(average * 10) / 10);
      return newRatings;
    });
  }, []);

  const handleSubmit = () => {
    console.log('Submitting ratings:', { player_id, event_id, ratings, overallRating });
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    });
  };

  const submitScale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.9, 1.1],
  });

  return (
    <SafeAreaView className="flex-1 bg-blue-50 dark:bg-gray-900">
      <ScrollView className="flex-1 px-6 py-8">
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          className="absolute z-10 p-2 bg-white rounded-full shadow-md dark:bg-gray-800 top-4 left-4"
        >
          <Ionicons name="arrow-back" size={24} color="#3B82F6" className="dark:text-blue-400" />
        </TouchableOpacity>
        
        <View className="items-center mt-12 mb-8">
          <Text className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
            Rate Player
          </Text>
          <View className="w-full p-4 mt-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Text className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
              {player_name}
            </Text>
            <Text className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400">
              for event:
            </Text>
            <Text className="mt-1 text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
              {event_name}
            </Text>
          </View>
          <View className="flex-row items-center p-3 mt-6 bg-blue-100 rounded-full dark:bg-blue-900">
            <Text className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {overallRating}
            </Text>
            <Text className="ml-2 text-lg text-gray-700 dark:text-gray-300">
              Overall Rating
            </Text>
          </View>
        </View>

        {skills.map(skill => (
          <View key={skill.key} className="p-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <View className="flex-row items-center mb-3">
              <Ionicons name={skill.icon} size={24} color="#3B82F6" className="dark:text-blue-400" />
              <Text className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
                {skill.name}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-4">
                <MultiSlider
                  values={[ratings[skill.key]]}
                  min={0}
                  max={10}
                  step={0.5}
                  sliderLength={250}
                  onValuesChange={(values) => handleSliderChange(skill.key, values)}
                  selectedStyle={{ backgroundColor: '#3B82F6', height: 4 }}
                  unselectedStyle={{ backgroundColor: '#E5E7EB', height: 4 }}
                  containerStyle={{ height: 40 }}
                  trackStyle={{ height: 4 }}
                  markerStyle={{
                    backgroundColor: '#3B82F6',
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                  }}
                />
              </View>
              <Text className="w-12 text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
                {ratings[skill.key]}
              </Text>
            </View>
          </View>
        ))}

        <Animated.View style={{ transform: [{ scale: submitScale }] }}>
          <TouchableOpacity
            className="items-center px-6 py-4 mt-6 mb-8 rounded-lg"
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="items-center w-full px-6 py-4 rounded-lg"
            >
              <Text className="text-lg font-semibold text-white">
                Submit Ratings
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RatePlayerPage;