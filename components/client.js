import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
  }),
  cache: new InMemoryCache(),
});
