import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AppLayout } from '../../components';
import TeamCard from '../../components/ui/Team/TeamCard';
import FilterInput from '../../components/ui/Input/FilterInput';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useGetTeamInfoQuery } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useGetConstantFromKeyQuery } from '../../../features/query/constantsQueryService';

const ManagerPaymentPage = ({ navigation }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isLoading, isError } = useGetTeamInfoQuery(user?.teams);
  const [filterText, setFilterText] = useState('');
  
  const [constantKey, setConstantKey] = useState(null);
  const { data: constantData, isLoading: isLoadingConstant } = useGetConstantFromKeyQuery(constantKey, {
    skip: !constantKey
  });

  

  useEffect(() => {
    if (user?.province) {
      setConstantKey(`monthly_payment_${user.province}`);
    }
  }, [user?.province]);

  const monthlyPaymentAmount = constantData?.value;

  const filteredData = data?.filter((team) =>
    team.team_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TeamCard
        key={item._id}
        teamName={item.team_name}
        teamId={item._id}
        coachName={'Ahmet Köksal'}
        navigation={() =>
          navigation.navigate('TeamDetailPage', {
            team_id: item._id,
            from: 'manager',
            monthlyPaymentAmount: monthlyPaymentAmount,
          })
        }
      />
    ),
    [navigation, monthlyPaymentAmount]
  );

  if (isLoading || isLoadingConstant) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg font-semibold text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg font-semibold text-red-500">
          Error loading teams.
        </Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg font-semibold text-gray-600">
          No team found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-teal-600 shadow-md rounded-b-3xl pb-4  py-4 ">
        <Text className="text-2xl font-bold text-gray-800 px-6 pt-6 pb-4">
          Team Payments
        </Text>
        <View className="px-4 mb-2">
          <FilterInput
            value={filterText}
            onChangeText={setFilterText}
            placeholder="Search teams..."
          />
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="flex-1"
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
};

export default ManagerPaymentPage;