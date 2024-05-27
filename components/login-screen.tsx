import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {client} from './client';
import {LOGIN_MUTATION} from './queries';
import {validateEmail, validatePassword} from './validations';
import {
  Container,
  H1,
  ButtonText,
  LoadingIndicator,
  ButtonStyles,
} from './styles';
import {TextField} from './text-field';

export const LoginScreen = (props: {componentId: string}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [login, {loading}] = useMutation(LOGIN_MUTATION, {
    client: client,
  });

  const navigateToUser = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'User',
      },
    });
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    setEmailError(trimmedEmail ? '' : 'Insira seu e-mail.');
    setPasswordError(password ? '' : 'Insira sua senha.');

    if (trimmedEmail && password) {
      if (!validateEmail(trimmedEmail)) {
        setEmailError('Formato do e-mail inválido.');
        return;
      }

      if (!validatePassword(password)) {
        setPasswordError(
          'A senha precisa conter ao menos 7 caracteres, uma letra e um número.',
        );
        return;
      }

      try {
        const {data, errors} = await login({
          variables: {
            data: {
              email: trimmedEmail,
              password: password,
            },
          },
        });

        if (errors && errors.length > 0) {
          const errorMessage =
            errors[0].message || 'Ocorreu um erro durante o login.';
          Alert.alert('Error', errorMessage);
        } else {
          await AsyncStorage.setItem('token', data.login.token);
          navigateToUser();
        }
      } catch (error) {
        console.warn('Login error:', error);
        Alert.alert('Error', 'Ocorreu um erro durante o login.');
      }
    }
  };

  return (
    <Container>
      <H1>Bem-vindo(a) à Taqtile!</H1>
      <TextField
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
        error={emailError}
      />
      <TextField
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
        error={passwordError}
      />
      {loading ? <LoadingIndicator /> : null}
      <ButtonStyles onPress={handleLogin} disabled={loading}>
        <ButtonText>Entrar</ButtonText>
      </ButtonStyles>
    </Container>
  );
};
