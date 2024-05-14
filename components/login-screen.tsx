import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useMutation,
  gql,
  ApolloProvider,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
  }),
  cache: new InMemoryCache(),
});

const LOGIN_MUTATION = gql`
  mutation Mutation($data: LoginInput!) {
    login(data: $data) {
      token
      error
    }
  }
`;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [login, {loading}] = useMutation(LOGIN_MUTATION, {
    client: client,
  });

  const handleLogin = async () => {
    setEmailError(email.trim() ? '' : 'Insira seu e-mail.');
    setPasswordError(password.trim() ? '' : 'Insira sua senha.');

    if (email.trim() && password.trim()) {
      if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
        setEmailError('Formato do e-mail inválido.');
        return;
      }

      if (
        password.length < 7 ||
        !/\d/.test(password.trim()) ||
        !/[a-zA-Z]/.test(password.trim())
      ) {
        setPasswordError(
          'A senha precisa conter ao menos 7 caracteres, uma letra e um número.',
        );
        return;
      }

      try {
        const {data, errors} = await login({
          variables: {
            data: {
              email: email.trim(),
              password: password.trim(),
            },
          },
        });

        if (errors && errors.length > 0) {
          const errorMessage =
            errors[0].message || 'Ocorreu um erro durante o login.';
          Alert.alert('Error', errorMessage);
        } else if (data.login.error) {
          Alert.alert('Error', data.login.error);
        } else {
          await AsyncStorage.setItem('token', data.login.token);
          Alert.alert('Successo', 'Login realizado com sucesso!');
        }
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', 'Ocorreu um erro durante o login.');
      }
    }
  };

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo(a) à Taqtile!</Text>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}
        <Button title="Entrar" onPress={handleLogin} disabled={loading} />
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
