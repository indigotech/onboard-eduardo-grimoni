import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateBirthdate,
} from './validations';
import {CREATE_USER_MUTATION} from './queries';
import {client} from './client';
import {useMutation} from '@apollo/client';
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

      Alert.alert('Sucesso', 'Usuário criado com sucesso.');
      navigateToUser();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Usuário</Text>
      <TextInput
        style={[styles.input, nameError ? styles.inputError : null]}
        placeholder="Nome"
        value={name}
        onChangeText={text => setName(text)}
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
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
      <TextInput
        style={[styles.input, phoneError ? styles.inputError : null]}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
      <TextInput
        style={[styles.input, birthDateError ? styles.inputError : null]}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={birthDate}
        onChangeText={text => setBirthDate(text)}
      />
      {birthDateError ? (
        <Text style={styles.error}>{birthDateError}</Text>
      ) : null}
      <Button
        title="Criar Usuário"
        onPress={handleAddUser}
        disabled={mutationLoading}
      />
      {mutationLoading && <ActivityIndicator style={styles.loadingIndicator} />}
    </View>
  );
};
