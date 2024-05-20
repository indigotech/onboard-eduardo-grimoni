import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/client';
import {styles} from './styles';
import {GET_USERS} from './queries';
import {client} from './client';

interface User {
  id: number;
  name: string;
  email: string;
}

const Userlist = (props: {componentId: string}) => {
  const {
    loading,
    error: graphqlError,
    data,
  } = useQuery(GET_USERS, {
    client,
  });
  console.log(props.componentId);

  const renderItem = ({item}: {item: User}) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : graphqlError ? (
        <Text style={styles.error}>Error: {graphqlError.message}</Text>
      ) : (
        <FlatList
          data={data?.users.nodes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Userlist;
