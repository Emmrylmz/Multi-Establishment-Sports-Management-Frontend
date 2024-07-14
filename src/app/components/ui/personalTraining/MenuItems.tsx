import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

type MenuItem = {
  title: string
  icon: string
  navigation: () => void
}

const MenuItems = ({title,icon,navigation}: MenuItem) => {
  const isDark = useColorScheme() === 'dark'
  return (
    <TouchableOpacity 
      className="w-[48%] aspect-square mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      onPress={navigation}
    >
      <View className="items-center justify-center flex-1 p-4">
        <Ionicons name={icon} size={48} color={isDark ? 'white' : 'black'} />
        <Text className="mt-4 text-lg font-semibold text-center text-black dark:text-white">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MenuItems