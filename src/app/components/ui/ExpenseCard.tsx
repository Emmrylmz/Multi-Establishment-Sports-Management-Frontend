import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5,SimpleLineIcons } from '@expo/vector-icons';

type ExpenseCardProps = {
  type: string,
  name: string,
  date: string,
  price: number,
  isPaid?: boolean,
  paidDate?: string,
}
<FontAwesome5 name="money-check-alt" size={24} color="black" />

const ExpenseCard = ({type,name,date,price,isPaid,paidDate}: ExpenseCardProps) => {
  return (
    <View className='grid flex-row items-center w-full grid-cols-4 px-4 py-2 my-1 rounded-3xl bg-dacka-dark-gray'>
      <View className='w-2/12'>
        <FontAwesome5 name={type} size={24} color="white" />
      </View>
      <View className='w-7/12'>
        <Text className='my-0.5 text-lg text-white'>{name}</Text>
        <Text className='my-0.5 text-xs text-dacka-gray'>{date}</Text>
      </View>
      <Text className='w-2/12 text-xl text-white'>{price}$</Text>
      <SimpleLineIcons className='w-1/12' name="arrow-right" size={24} color="white" />
    </View>
  )
}

export default ExpenseCard