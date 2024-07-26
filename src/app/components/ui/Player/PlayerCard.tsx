import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from 'i18next';

type PlayerCardProps = {
  name: string,
  image: ImageSourcePropType,
  attended?: boolean,
  id: string,
  onPress: () => void,
  position?: string,
};

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  name, 
  id, 
  image, 
  attended, 
  onPress,
  position = 'Player'
}) => {
  const setStatusText = () => {
    if(position === 'Player'){
      return t('userStatus.player')
    }else if(position === 'Coach'){
      return t('userStatus.coach')
    }else if(position === 'Manager'){
      return t('userStatus.manager')
    }
  }
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className="flex-row items-center p-4 mb-2 bg-white rounded-lg shadow-sm shadow-dacka-light-green dark:bg-dacka-dark-gray"
    >
      <Image
        source={image}
        className="w-12 h-12 mr-4 rounded-full"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">{name}</Text>
        <Text className="text-sm text-gray-700 dark:text-gray-300">{setStatusText()}</Text>
      </View>
      {attended !== undefined ? (
        <View className={`rounded-full p-2 ${attended ? 'bg-green-100' : 'bg-red-100'}`}>
          <Ionicons 
            name={attended ? 'checkmark' : 'close'} 
            size={24} 
            color={attended ? '#10B981' : '#EF4444'}
          />
        </View>
      ) : (
        <TouchableOpacity className="p-2 bg-teal-100 rounded-full">
          <Ionicons name="chevron-forward" size={24} color="#0D9488" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default PlayerCard;