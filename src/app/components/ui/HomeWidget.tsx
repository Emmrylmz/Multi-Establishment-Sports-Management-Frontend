import { View, Text } from 'react-native'
import React from 'react'


type HomeWidgetProps = {
  title?: string,
  additionalViewStyle?: string
  additionalTextStyle?: string
  icon?: React.ReactNode
};

const HomeWidget = ({title,additionalTextStyle,additionalViewStyle,icon}: HomeWidgetProps) => (
  <View className={`bg-white rounded-[38px] flex justify-center items-center px-12 mx-2 ${additionalViewStyle}`}>
    <View className='mx-auto'>
      {icon}
    </View>
    <Text className={additionalTextStyle}>{title}</Text>
  </View>
);


export default HomeWidget