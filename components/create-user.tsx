import React, {useState} from 'react';
import {Alert} from 'react-native';
import * as styles from './styles';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateBirthdate,
} from './validations';
import {client} from './client';
import {useMutation} from '@apollo/client';
import {CREATE_USER_MUTATION} from './queries';
import {Navigation} from 'react-native-navigation';

export const CreateUser = (props: {componentId: string}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [createUser, {loading: mutationLoading}] = useMutation(
    CREATE_USER_MUTATION,
    {client: client},
  );

  const navigateToUser = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'User',
      },
    });
  };

  const handleAddUser = async () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const parts = birthDate.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const newBirthDate = new Date(formattedDate);

    setNameError(!validateName(trimmedName) ? 'Digite um nome válido.' : '');
    setEmailError(
      !validateEmail(trimmedEmail) ? 'Digite um e-mail válido.' : '',
    );
    setPasswordError(
      !validatePassword(password)
        ? 'A senha deve ter pelo menos 7 caracteres e conter pelo menos uma letra e um número.'
        : '',
    );
    setPhoneError(
      !validatePhone(trimmedPhone)
        ? 'Digite um número de telefone válido.'
        : '',
    );
    setBirthDateError(
      !validateBirthdate(newBirthDate)
        ? 'Digite uma data de nascimento válida.'
        : '',
    );

    if (
      nameError ||
      emailError ||
      passwordError ||
      phoneError ||
      birthDateError
    ) {
      return;
    }
    try {
      await createUser({
        variables: {
          data: {
            role: 'user',
            phone: trimmedPhone,
            password: password,
            name: trimmedName,
            email: trimmedEmail,
            birthDate: newBirthDate,
          },
        },
      });
      navigateToUser();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o usuário.');
    }
  };

  return (
    <styles.Container>
      <styles.H1>Criar Usuário</styles.H1>
      <styles.TextField
        placeholder="Nome"
        value={name}
        onChangeText={text => setName(text)}
      />
      {nameError ? (
        <styles.ErrorCaption>{nameError}</styles.ErrorCaption>
      ) : null}
      <styles.TextField
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      {emailError ? (
        <styles.ErrorCaption>{emailError}</styles.ErrorCaption>
      ) : null}
      <styles.TextField
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {passwordError ? (
        <styles.ErrorCaption>{passwordError}</styles.ErrorCaption>
      ) : null}
      <styles.TextField
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      {phoneError ? (
        <styles.ErrorCaption>{phoneError}</styles.ErrorCaption>
      ) : null}
      <styles.TextField
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={birthDate}
        onChangeText={text => setBirthDate(text)}
      />
      {birthDateError ? (
        <styles.ErrorCaption>{birthDateError}</styles.ErrorCaption>
      ) : null}
      <styles.Button onPress={handleAddUser} disabled={mutationLoading}>
        <styles.ButtonText>Criar Usuário</styles.ButtonText>
      </styles.Button>
      {mutationLoading && <styles.LoadingIndicator />}
    </styles.Container>
  );
};
