import  React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { ScrollView, Text, View } from 'react-native';
import ProfileHeader from '../../components/profileComponents/ProfileHeader';

const PlayerProfilePage: React.FC = () => {
	const user = useSelector((state: RootState) => getAuthUser(state));

	return (
        <View className="flex-1 items-center">
        <ProfileHeader />

        <ScrollView className="w-10/12 flex-1">
          <View className="gap-7  pt-5">
            <Text className="text-2xl">Account Info</Text>

            <View className="gap-y-2">
              <Text className="text-xl opacity-50">Name</Text>
              <Text className="text-xl">{user?.name}</Text>
            </View>

            <View className="gap-y-5">
              <Text className="text-xl opacity-50">Email</Text>
              <Text className="text-xl">{user?.email}</Text>
            </View>
            <View className="gap-y-5">
              <Text className="text-xl opacity-50">Email</Text>
              <Text className="text-xl">{user?.email}</Text>
            </View>
            <View className="gap-y-5">
              <Text className="text-xl opacity-50">Email aa</Text>
              <Text className="text-xl">{user?.email}</Text>
            </View>
            <View className="gap-y-5">
              <Text className="text-xl opacity-50">Email</Text>
              <Text className="text-xl">{user?.email}</Text>
            </View>
            <View className="gap-y-5">
              <Text className="text-xl opacity-50">Email</Text>
              <Text className="text-xl">{user?.email}</Text>
            </View>

            {/* Assuming socials are stored as an array or similar, joined here for display */}
          </View>
        </ScrollView>
      </View>
    );
};

export default PlayerProfilePage;
