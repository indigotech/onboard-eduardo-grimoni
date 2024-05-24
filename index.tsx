import React from 'react';
import {Navigation} from 'react-native-navigation';
import {LoginScreen} from './components/login-screen.tsx';
import {UserList} from './components/user-list.tsx';
import {ApolloProvider} from '@apollo/client';
import {client} from './components/client.ts';
import {CreateUser} from './components/create-user.tsx';
import {UserDetails} from './components/user-details.tsx';

Navigation.registerComponent('Login', () => props => (
  <ApolloProvider client={client}>
    <LoginScreen componentId={props.componentId} />
  </ApolloProvider>
));
Navigation.registerComponent('User', () => props => (
  <ApolloProvider client={client}>
    <UserList componentId={props.componentId} />
  </ApolloProvider>
));
Navigation.registerComponent('Create', () => props => (
  <ApolloProvider client={client}>
    <CreateUser componentId={props.componentId} />
  </ApolloProvider>
));
Navigation.registerComponent('Details', () => props => (
  <ApolloProvider client={client}>
    <UserDetails userId={props.userId} />
  </ApolloProvider>
));

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
