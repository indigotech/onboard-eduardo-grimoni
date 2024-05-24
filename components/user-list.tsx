import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useQuery} from '@apollo/client';
import * as styles from './styles';
import {GET_USERS} from './queries';
import {Navigation} from 'react-native-navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList = (props: {componentId: string}) => {
  const [offset, setOffset] = useState(0);
  const {loading, error, data, fetchMore} = useQuery(GET_USERS, {
    variables: {
      data: {
        offset: 0,
        limit: 11,
      },
    },
  });

  const navigateToCreateUser = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Create',
      },
    });
  };

  const navigateToUserDetails = (userId: number) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Details',
        passProps: {
          userId: userId,
        },
      },
    });
  };

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
    <TouchableOpacity onPress={() => navigateToUserDetails(item.id)}>
      <styles.UserContainer>
        <styles.UserName>{item.name}</styles.UserName>
        <styles.UserEmail>{item.email}</styles.UserEmail>
      </styles.UserContainer>
    </TouchableOpacity>
  );

  return (
    <styles.Container>
      <styles.H1>Lista de Usuários</styles.H1>
      {loading && offset === 0 ? (
        <styles.LoadingIndicator />
      ) : error ? (
        <styles.ErrorCaption>Error: {error.message}</styles.ErrorCaption>
      ) : (
        <FlatList
          data={data?.users.nodes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreData}
        />
      )}
      <styles.BottomRightContainer>
        <styles.RoundButton onPress={navigateToCreateUser}>
          <styles.PlusSign>+</styles.PlusSign>
        </styles.RoundButton>
      </styles.BottomRightContainer>
    </styles.Container>
  );
};
