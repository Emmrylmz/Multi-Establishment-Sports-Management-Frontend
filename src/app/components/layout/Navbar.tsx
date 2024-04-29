import { View, Text } from 'react-native'
import React from 'react'
import { navbarTexts } from '../../../utils/constants/texts'

type NavbarProps = {
  name: string | undefined
}
const Navbar = ({name}: NavbarProps) => {
  return (
    <View className='flex-row items-center justify-between w-full px-4 py-1 my-2'>
      <Text className='text-white'>{navbarTexts.greet}, {name}</Text>
      <Text className='text-white'>{navbarTexts.logout}</Text>
    </View>
  )
}

export default Navbar