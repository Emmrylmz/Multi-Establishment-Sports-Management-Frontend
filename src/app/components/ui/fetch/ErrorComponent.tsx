import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const ErrorComponent = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <View className="items-center justify-center flex-1 p-4 bg-dacka-white dark:bg-dacka-black">
      <View className="items-center w-full max-w-sm p-6 bg-gray-300 rounded-lg dark:bg-dacka-dark-gray">
        <Text className="mb-4 text-4xl">😕</Text>
        <Text className="mb-2 text-xl font-bold text-center text-dacka-black dark:text-dacka-white">
          {t("fetchMessages.errorTitle")}
        </Text>
        <Text className="mb-6 text-center text-dacka-dark-gray dark:text-dacka-gray">
          {t("fetchMessages.error")}
        </Text>
        <TouchableOpacity
          onPress={onRetry}
          className="px-6 py-3 rounded-full bg-dacka-green hover:bg-dacka-light-green"
        >
          <Text className="font-semibold text-dacka-white">
            {t("fetchMessages.retry")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorComponent;