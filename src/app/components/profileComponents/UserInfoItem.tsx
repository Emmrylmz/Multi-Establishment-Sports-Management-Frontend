// UserInfoItem.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface UserInfoItemProps {
  label: string;
  value: string | undefined;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ label, value }) => (
  <View className="gap-y-5">
    <Text className="text-xl opacity-50">{label}</Text>
    <Text className="text-xl">{value}</Text>
  </View>
);

export default UserInfoItem;
