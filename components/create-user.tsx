import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {styles} from './styles';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateBirthdate,
} from './validations';

export const CreateUser = () => {
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

  const handleAddUser = async () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedBirthDate = birthDate.trim();

    setNameError(trimmedName ? '' : 'Digite o seu nome.');
    if (!nameError && !validateName(name)) {
      setNameError('Digite um nome válido.');
      return;
    }
    setEmailError(trimmedEmail ? '' : 'Digite o seu e-mail.');
    if (!emailError && !validateEmail(email)) {
      setEmailError('Digite um e-mail válido.');
      return;
    }
    setPasswordError(password ? '' : 'Digite a sua senha.');
    if (!passwordError && !validatePassword(password)) {
      setPasswordError(
        'A senha deve ter pelo menos 7 caracteres e conter pelo menos uma letra e um número.',
      );
      return;
    }
    setPhoneError(trimmedPhone ? '' : 'Digite o seu número de telefone.');
    if (!phoneError && !validatePhone(phone)) {
      setPhoneError('Digite um número de telefone válido.');
      return;
    }
    setBirthDateError(
      trimmedBirthDate ? '' : 'Digite a sua data de nascimento.',
    );
    if (!birthDateError && !validateBirthdate(birthDate)) {
      setBirthDateError('Digite uma data de nascimento válida.');
      return;
    }

    console.log({
      name: trimmedName,
      email: trimmedEmail,
      password,
      phone: trimmedPhone,
      birthDate: trimmedBirthDate,
    });

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setPhoneError('');
    setBirthDateError('');

    Alert.alert('Sucesso', 'Usuário criado com sucesso.');
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
        placeholder="Data de Nascimento (AAAA-MM-DD)"
        value={birthDate}
        onChangeText={text => setBirthDate(text)}
      />
      {birthDateError ? (
        <Text style={styles.error}>{birthDateError}</Text>
      ) : null}
      <Button title="Criar Usuário" onPress={handleAddUser} />
    </View>
  );
};
