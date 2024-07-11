import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { AppLayout } from '../../components';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useLazySearchUsersQuery } from '../../../features/query/userInfoQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import QueryInput from '../../components/ui/Input/QueryInput';
import PlayerCard from '../../components/ui/Player/PlayerCard';
import { Ionicons } from '@expo/vector-icons';

const DEBOUNCE_TIME = 300; // 300ms for debounce

const ManagerPaymentPage = ({ navigation }) => {
	const user = useSelector((state: RootState) => getAuthUser(state));
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
	const [trigger, { data: usersData, isLoading, isError, isFetching }] =
		useLazySearchUsersQuery();

	// Initial load
	useEffect(() => {
		trigger({ query: '', province: 'Izmir', page: 1 });
	}, [trigger]);

	const handleQueryChange = useCallback(
		(query: string) => {
			setSearchTerm(query);
			setPage(1);
			trigger({ query, province: 'Izmir', page: 1 });
		},
		[trigger]
	);

	const handleLoadMore = useCallback(() => {
		if (!isFetching) {
			const nextPage = page + 1;
			setPage(nextPage);
			trigger({ query: searchTerm, province: 'Izmir', page: nextPage });
		}
	}, [isFetching, page, searchTerm, trigger]);

	const handleNavigation = useCallback(
		(player_id) => {
			navigation.navigate('ManagerPlayerPaymentDetailPage', {
				player_id: player_id,
				team_id: user.team_id,
			});
		},
		[navigation, user.team_id]
	);

	const renderItem = useCallback(
		({ item }) => (
			<PlayerCard
				id={item._id}
				name={item.name}
				image={{ uri: item.image }}
				attended={item.attended}
				position={item.position}
				onPress={() => handleNavigation(item._id)}
			/>
		),
		[handleNavigation]
	);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    trigger({ query: searchTerm, province: 'Izmir', page: 1 }).then(() => {
      setRefreshing(false);
    });
  }, [searchTerm, trigger]);

  const renderFooter = () => {
    if (!isFetching) return null;
    return <ActivityIndicator size="small" color="#0D9488" />;
  };

  if (isLoading && !usersData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#0D9488" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        <Text className="mt-4 text-gray-700 font-semibold">Error loading users.</Text>
      </View>
    );
  }

  return (
    <>
      <View className="bg-white pt-12 pb-5 px-4 rounded-b-3xl shadow-md bg-teal-600">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Player Payments</Text>
        <QueryInput
          onQueryChange={handleQueryChange}
          debounceTime={DEBOUNCE_TIME}
          placeholder="Search for players..."
        />
      </View>
      <FlatList
        className="mt-4 px-4"
        data={usersData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.5}
        // onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-8">
            <Ionicons name="search-outline" size={48} color="#9CA3AF" />
            <Text className="mt-4 text-gray-500 font-medium">No players found</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#0D9488" />
        }
      />
      </>
  );
};

export default ManagerPaymentPage;