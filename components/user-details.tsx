import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_DETAILS} from './queries';
import * as styles from './styles';

export function UserDetails(props: {userId: any}) {
  const {userId} = props;
  console.log(userId);
  const {loading, error, data} = useQuery(GET_DETAILS, {
    variables: {
      userId: userId,
    },
  });

  if (loading) {
    return <styles.LoadingIndicator />;
  }
  if (error) {
    return <styles.ErrorCaption>Error: {error.message}</styles.ErrorCaption>;
  }

  const user = data.user;

  const formattedBirthDate = `${user.birthDate.split('-')[2]}/${
    user.birthDate.split('-')[1]
  }/${user.birthDate.split('-')[0]}`;

  return (
    <styles.Container>
      <styles.H1>User Details</styles.H1>
      <styles.UserContainer>
        <styles.UserName>ID: {user.id}</styles.UserName>
      </styles.UserContainer>
      <styles.UserContainer>
        <styles.UserName>Name: {user.name}</styles.UserName>
      </styles.UserContainer>
      <styles.UserContainer>
        <styles.UserName>Phone: {user.phone}</styles.UserName>
      </styles.UserContainer>
      <styles.UserContainer>
        <styles.UserName>Birth Date: {formattedBirthDate}</styles.UserName>
      </styles.UserContainer>
      <styles.UserContainer>
        <styles.UserName>Email: {user.email}</styles.UserName>
      </styles.UserContainer>
      <styles.UserContainer>
        <styles.UserName>Role: {user.role}</styles.UserName>
      </styles.UserContainer>
    </styles.Container>
  );
}
