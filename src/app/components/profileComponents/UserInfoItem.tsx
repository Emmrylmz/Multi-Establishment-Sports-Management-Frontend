// UserInfoItem.tsx
import React from 'react';
import { View, Text } from 'react-native';

type UserInfoItemProps = {
  label: string;
  value: string | undefined;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ label, value }) => (
  <View className="my-3">
    <Text className="text-xl text-white opacity-50">{label}</Text>
    <Text className="text-xl text-white">{value}</Text>
  </View>
);

export default UserInfoItem;
