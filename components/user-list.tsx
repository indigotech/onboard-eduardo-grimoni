import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/client';
import {styles} from './styles';
import {GET_USERS} from './queries';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList = () => {
  const [offset, setOffset] = useState(0);
  const {loading, error, data, fetchMore} = useQuery(GET_USERS, {
    variables: {
      data: {
        offset: 0,
        limit: 11,
      },
    },
  });

  useEffect(() => {
    if (!loading && data && data.users.pageInfo.hasNextPage) {
      const newOffset = data.users.nodes.length;
      setOffset(newOffset);
    }
  }, [loading, data]);

  const loadMoreData = () => {
    if (!loading && data && data.users.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          data: {
            offset: offset,
            limit: 11,
          },
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            ...prev,
            users: {
              ...prev.users,
              nodes: [...prev.users.nodes, ...fetchMoreResult.users.nodes],
            },
          };
        },
      });
    }
  };

  const renderItem = ({item}: {item: User}) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      {loading && offset === 0 ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.error}>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={data?.users.nodes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreData}
        />
      )}
    </View>
  );
};
