import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoginScreen from '/Users/taqtile/onboard-eduardo-grimoni/components/login-screen.tsx'

const App = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
