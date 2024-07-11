import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { AppLayout } from '../../components';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useLazySearchUsersQuery } from '../../../features/query/userInfoQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import QueryInput from '../../components/ui/Input/QueryInput';
import PlayerCard from '../../components/ui/Player/PlayerCard';

const DEBOUNCE_TIME = 300; // 300ms for debounce

const ManagerPaymentPage = ({ navigation }) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [trigger, { data: usersData, isLoading, isError, isFetching }] = useLazySearchUsersQuery();

  // Initial load
  useEffect(() => {
    trigger({ query: '', province: 'Izmir', page: 1 });
  }, [trigger]);

  const handleQueryChange = useCallback((query: string) => {
    setSearchTerm(query);
    setPage(1);
    trigger({ query, province: 'Izmir', page: 1 });
  }, [trigger]);

  const handleLoadMore = useCallback(() => {
    if (!isFetching) {
      const nextPage = page + 1;
      setPage(nextPage);
      trigger({ query: searchTerm, province: 'Izmir', page: nextPage });
    }
  }, [isFetching, page, searchTerm, trigger]);

  const renderItem = ({ item }) => (
    <PlayerCard
      id={item.id}
      name={item.name}
      image={{ uri: item.image }}
      attended={item.attended}
      position={item.position}
      onPress={() => {/* Handle player card press */}}
    />
  );

  const renderFooter = () => {
    if (!isFetching) return null;
    return <ActivityIndicator size="small" color="#0000ff" />;
  };

  if (isLoading && !usersData) {
    return <ActivityIndicator size="large" color="#919191" />;
  }

  if (isError) {
    return (
      <View>
        <Text>Error loading users.</Text>
      </View>
    );
  }

  return (
    <AppLayout>
      <QueryInput onQueryChange={handleQueryChange} debounceTime={DEBOUNCE_TIME} />
      <FlatList
        data={usersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => <Text>No users found</Text>}
      />
    </AppLayout>
  );
};

export default ManagerPaymentPage;