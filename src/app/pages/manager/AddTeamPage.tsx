// CreateTeamPage.tsx
import React, { useState, useRef } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CreateTeamPage = ({navigation}) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    team_category: null,
    team_players: [],
    team_coaches: ['', ''],
    province: '',
  });

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleInputChange = (name: string, value: string | number, index?: number) => {
    setForm((prevState) => {
      if (index !== undefined && Array.isArray(prevState[name])) {
        const newArray = [...prevState[name]];
        newArray[index] = value;
        return { ...prevState, [name]: newArray };
      }
      if (name === 'team_category') {
        // Reset team_players when changing category
        return { ...prevState, [name]: value, team_players: [] };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = () => {
    console.log('Team created:', form);
  };

  const renderInputField = (name: string, placeholder: string, icon: string) => (
    <View className="mb-6">
      <Text className="mb-2 text-sm text-gray-400 dark:text-gray-300">{placeholder}</Text>
      <View className="flex-row items-center p-3 bg-white rounded-lg dark:bg-gray-800">
        <Ionicons name={icon as any} size={24} color="#60A5FA" className="mr-3" />
        <TextInput
          className="flex-1 text-gray-800 dark:text-white"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={form[name]}
          onChangeText={(value) => handleInputChange(name, value)}
        />
      </View>
    </View>
  );

  const renderArrayInputField = (name: string, placeholder: string, icon: string) => (
    <View className="mb-6">
      <Text className="mb-2 text-sm text-gray-400 dark:text-gray-300">{placeholder}</Text>
      {form[name].map((value, index) => (
        <View key={index} className="flex-row items-center p-3 mb-2 bg-white rounded-lg dark:bg-gray-800">
          <Ionicons name={icon as any} size={24} color="#60A5FA" className="mr-3" />
          <TextInput
            className="flex-1 text-gray-800 dark:text-white"
            placeholder={`${placeholder} ${index + 1}`}
            placeholderTextColor="#6B7280"
            value={value}
            onChangeText={(value) => handleInputChange(name, value, index)}
          />
        </View>
      ))}
    </View>
  );

  const teamCategories = [
    { label: 'U18A', value: 18 },
    { label: 'U18B', value: 18 },
    { label: 'U16A', value: 16 },
    { label: 'U16B', value: 16 },
    { label: 'U14A', value: 14 },
    { label: 'U14B', value: 14 },
    { label: 'U12A', value: 12 },
    { label: 'U12B', value: 12 },
    { label: 'U10A', value: 10 },
    { label: 'U10B', value: 10 },
  ];

  const allPlayers = [
    { id: 1, name: 'John Doe', age: 18 },
    { id: 2, name: 'Jane Doe', age: 16 },
    { id: 3, name: 'Alice Doe', age: 14 },
    { id: 4, name: 'Bob Doe', age: 12 },
    { id: 5, name: 'Charlie Doe', age: 18 },
    { id: 6, name: 'Charlie Doe', age: 16 },
    { id: 7, name: 'Charlie Doe', age: 14 },
    { id: 8, name: 'Charlie Doe', age: 12 },
    { id: 9, name: 'Charlie Doe', age: 10 },
    { id: 10, name: 'Charlie Doe', age: 12 }
  ];

  const renderDropdownItem = (item) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <Text className="text-lg font-semibold text-gray-800 dark:text-white">{item.label}</Text>
      <View className="px-2 py-1 bg-blue-500 rounded">
        <Text className="text-sm font-medium text-white">{item.value}</Text>
      </View>
    </View>
  );

  const renderPlayerItem = (player) => {
    const isSelected = form.team_players.includes(player.id);
    return (
      <TouchableOpacity
        key={player.id}
        className={`flex-row items-center justify-between p-4 mb-2 rounded-lg ${
          isSelected ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'
        }`}
        onPress={() => {
          const updatedPlayers = isSelected
            ? form.team_players.filter(id => id !== player.id)
            : [...form.team_players, player.id];
          handleInputChange('team_players', updatedPlayers);
        }}
      >
        <View className="flex-row items-center">
          <Ionicons name="person-outline" size={24} color="#60A5FA" className="mr-3" />
          <Text className="text-lg font-semibold text-gray-800 dark:text-white">{player.name}</Text>
        </View>
        <Text className="text-sm text-gray-600 dark:text-gray-400">{t("createTeamPage.age")}: {player.age}</Text>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#60A5FA" className="ml-2" />
        )}
      </TouchableOpacity>
    );
  };

  const filteredPlayers = form.team_category
    ? allPlayers.filter(player => player.age === form.team_category)
    : [];

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        className="flex-1"
      >
        <LinearGradient
          colors={['#3B82F6', '#60A5FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="justify-end h-64 p-6"
        >
          <Animated.Text
            className="mb-2 text-4xl font-bold text-white"
            style={{
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -50],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            {t("createTeamPage.title")}
          </Animated.Text>
        </LinearGradient>

        <View className="px-6 py-8">
          <View className="p-6 mb-6 bg-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl">
            <Text className="mb-2 text-sm text-gray-400 dark:text-gray-300">{t("createTeamPage.teamCategory")}</Text>
            <Dropdown
              data={teamCategories}
              labelField="label"
              valueField="value"
              onChange={(item) => handleInputChange('team_category', item.value)}
              placeholder={t("createTeamPage.teamCategoryDropdownPlaceholder")}
              placeholderStyle={{ color: '#6B7280' }}
              selectedTextStyle={{ color: '#1F2937' }}
              style={{
                backgroundColor: '#F3F4F6',
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
              }}
              renderItem={renderDropdownItem}
              renderLeftIcon={() => (
                <Ionicons name="people-outline" size={24} color="#60A5FA" style={{ marginRight: 12 }} />
              )}
            />
            
            {form.team_category && (
              <>
                <Text className="mb-2 text-sm text-gray-400 dark:text-gray-300">{t("createTeamPage.selectPlayers")}</Text>
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map(renderPlayerItem)
                ) : (
                  <Text className="text-gray-600 dark:text-gray-400">{t("createTeamPage.noPlayers")}</Text>
                )}
              </>
            )}

            {renderArrayInputField('team_coaches', t("createTeamPage.coach"), 'baseball-outline')}
            {renderInputField('province', t("createTeamPage.province"), 'location-outline')}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="py-4 bg-blue-500 shadow-md rounded-xl"
          >
            <Text className="text-lg font-bold text-center text-white">
              {t("createTeamPage.save")}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>

      <TouchableOpacity
        className="absolute z-20 p-2 bg-gray-200 rounded-full dark:bg-gray-800 top-12 left-4"
        onPress={() => {/* Handle go back */}}
      >
        <Ionicons name="arrow-back" size={24} color="#60A5FA" onPress={() => navigation.goBack()} />
      </TouchableOpacity>
    </View>
  );
};

export default CreateTeamPage;