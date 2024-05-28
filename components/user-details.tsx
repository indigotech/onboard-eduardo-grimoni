import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_DETAILS} from './queries';
import {
  LoadingIndicator,
  ErrorCaption,
  Container,
  H1,
  UserContainer,
  UserName,
} from './styles';

export function UserDetails(props: {userId: any}) {
  const {userId} = props;
  console.log(userId);
  const {loading, error, data} = useQuery(GET_DETAILS, {
    variables: {
      userId: userId,
    },
  });

  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorCaption>Error: {error.message}</ErrorCaption>;
  }

  const user = data.user;

  const formattedBirthDate = `${user.birthDate.split('-')[2]}/${
    user.birthDate.split('-')[1]
  }/${user.birthDate.split('-')[0]}`;

  return (
    <Container>
      <H1>User Details</H1>
      <UserContainer>
        <UserName>ID: {user.id}</UserName>
      </UserContainer>
      <UserContainer>
        <UserName>Name: {user.name}</UserName>
      </UserContainer>
      <UserContainer>
        <UserName>Phone: {user.phone}</UserName>
      </UserContainer>
      <UserContainer>
        <UserName>Birth Date: {formattedBirthDate}</UserName>
      </UserContainer>
      <UserContainer>
        <UserName>Email: {user.email}</UserName>
      </UserContainer>
      <UserContainer>
        <UserName>Role: {user.role}</UserName>
      </UserContainer>
    </Container>
  );
}
