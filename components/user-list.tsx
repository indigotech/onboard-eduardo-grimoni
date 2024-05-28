import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_USERS} from './queries';
import {Navigation} from 'react-native-navigation';
import {
  UserContainer,
  UserName,
  UserEmail,
  Container,
  H1,
  LoadingIndicator,
  ErrorCaption,
  BottomRightContainer,
  RoundButton,
  PlusSign,
} from './styles';

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
      <UserContainer>
        <UserName>{item.name}</UserName>
        <UserEmail>{item.email}</UserEmail>
      </UserContainer>
    </TouchableOpacity>
  );

  return (
    <Container>
      <H1>Lista de Usuários</H1>
      {loading && offset === 0 ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorCaption>Error: {error.message}</ErrorCaption>
      ) : (
        <FlatList
          data={data?.users.nodes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreData}
        />
      )}
      <BottomRightContainer>
        <RoundButton onPress={navigateToCreateUser}>
          <PlusSign>+</PlusSign>
        </RoundButton>
      </BottomRightContainer>
    </Container>
  );
};
