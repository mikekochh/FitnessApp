import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styles from '../components/styles';

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Perform login logic here
    // If login is successful, navigate to the home screen
    navigation.replace('Home');
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create an Account" onPress={handleCreateAccount} />
    </View>
  );
};

export default LoginScreen;