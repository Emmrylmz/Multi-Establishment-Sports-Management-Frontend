import { View, Text } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { useSelector } from 'react-redux'
import { getAuthStatus, getAuthUser } from '../features/auth/auth.slice'

export default function LoginNavigation() {
  const user = useSelector(getAuthStatus)
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='bg-red-500'>{user}</Text>
    </View>
  )
}