import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import { useCreateTeamMutation } from '../../../features/query/teamQueryService';
import GoBackButton from '../../components/ui/GoBackButton';

const CreateTeamPage = () => {
  const [createTeam] = useCreateTeamMutation();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    team_category: null,
    team_players: [],
    team_coaches: ['', ''],
    province: '',
  });

  const handleInputChange = (name, value, index) => {
    setForm((prevState) => {
      if (index !== undefined && Array.isArray(prevState[name])) {
        const newArray = [...prevState[name]];
        newArray[index] = value;
        return { ...prevState, [name]: newArray };
      }
      if (name === 'team_category') {
        return { ...prevState, [name]: value, team_players: [] };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await createTeam(form).unwrap();
      console.log('Team created:', response);
    } catch (error) {
      console.error('Failed to create team:', error.data);
    }
  };

  const renderInputField = (name, placeholder, icon) => (
    <View className="mb-4">
      <Text className="mb-2 text-sm text-dacka-gray dark:text-dacka-white">{placeholder}</Text>
      <View className="flex-row items-center p-3 rounded-lg bg-dacka-white dark:bg-dacka-dark-gray">
        <Ionicons name={icon} size={24} color="#3FA454" className="mr-3" />
        <TextInput
          className="flex-1 text-dacka-black dark:text-dacka-white"
          placeholder={placeholder}
          placeholderTextColor="#919191"
          value={form[name]}
          onChangeText={(value) => handleInputChange(name, value)}
        />
      </View>
    </View>
  );

  const renderArrayInputField = (name, placeholder, icon) => (
    <View className="mb-4">
      <Text className="mb-2 text-sm text-dacka-gray dark:text-dacka-white">{placeholder}</Text>
      {form[name].map((value, index) => (
        <View key={index} className="flex-row items-center p-3 mb-2 rounded-lg bg-dacka-white dark:bg-dacka-dark-gray">
          <Ionicons name={icon} size={24} color="#3FA454" className="mr-3" />
          <TextInput
            className="flex-1 text-dacka-black dark:text-dacka-white"
            placeholder={`${placeholder} ${index + 1}`}
            placeholderTextColor="#919191"
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
    <View className="flex-row items-center justify-between p-4 border-b border-dacka-gray dark:border-dacka-white">
      <Text className="text-lg font-semibold text-dacka-black dark:text-dacka-white">{item.label}</Text>
      <View className="px-2 py-1 rounded bg-dacka-green">
        <Text className="text-sm font-medium text-dacka-white">{item.value}</Text>
      </View>
    </View>
  );

  const renderPlayerItem = (player) => {
    const isSelected = form.team_players.includes(player.id);
    return (
      <TouchableOpacity
        key={player.id}
        className={`flex-row items-center justify-between p-4 mb-2 rounded-lg ${
          isSelected ? 'bg-dacka-light-green' : 'bg-dacka-white dark:bg-dacka-dark-gray'
        }`}
        onPress={() => {
          const updatedPlayers = isSelected
            ? form.team_players.filter(id => id !== player.id)
            : [...form.team_players, player.id];
          handleInputChange('team_players', updatedPlayers);
        }}
      >
        <View className="flex-row items-center">
          <Ionicons name="person-outline" size={24} color="#3FA454" className="mr-3" />
          <Text className="text-lg font-semibold text-dacka-black dark:text-dacka-white">{player.name}</Text>
        </View>
        <Text className="text-sm text-dacka-gray dark:text-dacka-white">{t("createTeamPage.age")}: {player.age}</Text>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#3FA454" className="ml-2" />
        )}
      </TouchableOpacity>
    );
  };

  const filteredPlayers = form.team_category
    ? allPlayers.filter(player => player.age === form.team_category)
    : [];

    return (
      <SafeAreaView className="flex-1 bg-dacka-white dark:bg-dacka-black">
        <GoBackButton />
        <ScrollView className="flex-1">
          <View className="px-6 py-8">
            <Text className="mb-6 text-3xl font-bold text-dacka-black dark:text-dacka-white">
              {t("createTeamPage.title")}
            </Text>
  
            <View className="p-6 mb-6 bg-gray-200 dark:bg-dacka-dark-gray rounded-2xl">
              <Text className="mb-2 text-sm text-dacka-gray dark:text-dacka-white">{t("createTeamPage.teamCategory")}</Text>
              <Dropdown
                data={teamCategories}
                labelField="label"
                valueField="value"
                onChange={(item) => handleInputChange('team_category', item.value)}
                placeholder={t("createTeamPage.teamCategoryDropdownPlaceholder")}
                placeholderStyle={{ color: '#919191' }}
                selectedTextStyle={{ color: '#101010' }}
                style={{
                  backgroundColor: '#f3f4f6',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 24,
                }}
                renderItem={renderDropdownItem}
                renderLeftIcon={() => (
                  <Ionicons name="people-outline" size={24} color="#3FA454" style={{ marginRight: 12 }} />
                )}
              />
              
              {form.team_category && (
                <>
                  <Text className="mb-2 text-sm text-dacka-gray dark:text-dacka-white">{t("createTeamPage.selectPlayers")}</Text>
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map(renderPlayerItem)
                  ) : (
                    <Text className="text-dacka-gray dark:text-dacka-white">{t("createTeamPage.noPlayers")}</Text>
                  )}
                </>
              )}
  
              {renderArrayInputField('team_coaches', t("createTeamPage.coach"), 'baseball-outline')}
              {renderInputField('province', t("createTeamPage.province"), 'location-outline')}
            </View>
  
            <TouchableOpacity
              onPress={handleSubmit}
              className="py-4 bg-dacka-green rounded-xl"
            >
              <Text className="text-lg font-bold text-center text-dacka-white">
                {t("createTeamPage.save")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  
};

export default CreateTeamPage;