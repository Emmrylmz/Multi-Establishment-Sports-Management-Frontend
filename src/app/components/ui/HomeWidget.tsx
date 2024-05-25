import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type HomeWidgetProps = {
  clickable?: boolean,
  title?: string,
  additionalViewStyle?: string,
  additionalTextStyle?: string,
  icon?: React.ReactNode,
  onPress?: () => void, // Function to handle touch events
};

const HomeWidget: React.FC<HomeWidgetProps> = ({ clickable, title, additionalTextStyle, additionalViewStyle, icon, onPress }) => {
  // A function to decide whether to render TouchableOpacity or View
  const renderContent = () => (
    <>
      <View className='mx-auto'>
        {icon}
      </View>
      <Text className={additionalTextStyle}>{title}</Text>
    </>
  );

  if (clickable) {
    return (
      <TouchableOpacity
        className={`bg-white rounded-[38px] flex justify-center items-center px-12 mx-2 ${additionalViewStyle}`}
        onPress={onPress}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        className={`bg-white rounded-[38px] flex justify-center items-center px-12 mx-2 ${additionalViewStyle}`}
      >
        {renderContent()}
      </View>
    );
  }
};

export default HomeWidget;