import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    setEmailError(email.trim() ? '' : 'Insira seu e-mail.');
    setPasswordError(password.trim() ? '' : 'Insira sua senha.');

    if (email.trim() && password.trim()) {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setEmailError('Formato do e-mail inválido.');
        return;
      }

      if (
        password.length < 7 ||
        !/\d/.test(password) ||
        !/[a-zA-Z]/.test(password)
      ) {
        setPasswordError(
          'A senha precisa conter ao menos 7 caracteres, uma letra e um número.',
        );
        return;
      }

      console.log('E-mail:', email);
      console.log('Senha:', password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bom-vindo(a) à Taqtile!</Text>
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
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
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
