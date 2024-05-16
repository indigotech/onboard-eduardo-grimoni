import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
    </View>
  );
};

export default HomeScreen;
