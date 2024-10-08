import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import TeamCard from '../../components/ui/Team/TeamCard';
import FilterInput from '../../components/ui/Input/FilterInput';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useGetTeamInfoQuery } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useGetConstantFromKeyQuery } from '../../../features/query/constantsQueryService';
import LoadingIndicator from '../../components/ui/fetch/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import ErrorComponent from '../../components/ui/fetch/ErrorComponent';
import NoTeamsComponent from '../../components/ui/fetch/NoTeamsComponent';

const ManagerPaymentPage = ({ navigation }) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data, isLoading, isError,refetch } = useGetTeamInfoQuery(user?.teams);
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
    return <LoadingIndicator isLoading={isLoadingConstant} />;
  }

  if (isError || !data) {
    return <ErrorComponent onRetry={refetch} />;
  }

  if (data.length === 0) {
    return <NoTeamsComponent />;
  }

  return (
    <View className="flex-1 bg-gray-100 dark:bg-dacka-dark-gray">
      <View className="py-4 pb-4 bg-teal-600 shadow-md rounded-b-3xl ">
        <Text className="px-6 pt-6 pb-4 text-2xl font-bold text-gray-800">
          {t("managerPaymentPage.title")}
        </Text>
        <View className="px-4 mb-2">
          <FilterInput
            value={filterText}
            onChangeText={setFilterText}
            placeholder={t("managerPaymentPage.inputPlaceholder")}
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