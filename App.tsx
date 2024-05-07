import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HelloWorld = () => {
  return (
    <View style={Styles.container}>
      <Text>Hello, world!</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelloWorld;
