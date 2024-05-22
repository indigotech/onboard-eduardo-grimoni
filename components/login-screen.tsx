import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {styles} from './styles';
import {client} from './client';
import {LOGIN_MUTATION} from './queries';
import {validateEmail, validatePassword} from './validations';

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

  const navigateToCreateUser = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Create',
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
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          navigateToUser();
        }
      } catch (error) {
        console.warn('Login error:', error);
        Alert.alert('Error', 'Ocorreu um erro durante o login.');
      }
    }
  };

  return (
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
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      {loading ? <ActivityIndicator style={styles.loadingIndicator} /> : null}
      <Button
        title="Entrar"
        color={'#40e0d0'}
        onPress={handleLogin}
        disabled={loading}
      />

      <View style={styles.bottomRightContainer}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={navigateToCreateUser}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
