import React from 'react';
import {Navigation} from 'react-native-navigation';
import {LoginScreen} from './components/login-screen.tsx';
import {UserList} from './components/user-list.tsx';
import {ApolloProvider} from '@apollo/client';
import {client} from './components/client.ts';
import {CreateUser} from './components/create-user.tsx';

Navigation.registerComponent('Login', () => props => (
  <ApolloProvider client={client}>
    <LoginScreen componentId={props.componentId} />
  </ApolloProvider>
));

const UserListWithApollo = () => (
  <ApolloProvider client={client}>
    <UserList />
  </ApolloProvider>
);

const CreateUserWithApollo = () => (
  <ApolloProvider client={client}>
    <CreateUser />
  </ApolloProvider>
);

Navigation.registerComponent('User', () => UserListWithApollo);
Navigation.registerComponent('Create', () => CreateUserWithApollo);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
            },
          },
        ],
      },
    },
  });
});
