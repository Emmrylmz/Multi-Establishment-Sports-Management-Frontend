import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import PlayerCard from './PlayerCard';

type User = {
  id: string,
  name: string,
  image: string,
  attended?: boolean,
  position?: string,
};

type PlayerListProps = {
  initialUsers: User[],
  loadMoreUsers?: (page: number) => Promise<User[]>,
};

const PlayerList: React.FC<PlayerListProps> = ({ initialUsers, loadMoreUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newUsers = await loadMoreUsers(page);
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setPage((prevPage) => prevPage + 1);
      if (newUsers.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, loadMoreUsers]);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const renderItem = ({ item }: { item: User }) => (
    <PlayerCard
      id={item.id}
      name={item.name}
      image={{ uri: item.image }}
      attended={item.attended}
      position={item.position}
      onPress={() => {}}
    />
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default PlayerList;
