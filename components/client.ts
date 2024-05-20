import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  let token = '';
  try {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken !== null) {
      token = storedToken;
    }
  } catch (error) {
    console.error('Erro ao obter token do AsyncStorage:', error);
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
