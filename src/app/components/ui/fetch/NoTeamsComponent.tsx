import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package if not already installed

const NoTeamsComponent = () => {
  const { t } = useTranslation();

  return (
    <View className="items-center justify-center flex-1 p-6 bg-dacka-white dark:bg-dacka-black">
      <View className="items-center mb-8">
        <Ionicons name="people-outline" size={80} color="#3FA454" />
      </View>
      <Text className="mb-4 text-2xl font-bold text-center text-dacka-black dark:text-dacka-white">
        {t("fetchMessages.noTeamsTitle")}
      </Text>
      <Text className="mb-8 text-lg text-center text-dacka-dark-gray dark:text-dacka-gray">
        {t("fetchMessages.noTeams")}
      </Text>
      <TouchableOpacity
        className="flex-row items-center px-6 py-3 rounded-full bg-dacka-green"
      >
        <Ionicons name="add-circle-outline" size={24} color="#f3f4f6" />
        {/* <Text className="ml-2 text-lg font-semibold text-dacka-white">
          {t("teams.createTeam")}
        </Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default NoTeamsComponent;