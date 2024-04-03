import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from '../components/styles';
import { User } from '../components/types';
import { API_BASE_URL, API_USERS_ENDPOINT } from '../components/constants';

const LoginScreen = ({ navigation }) => {
  
  const [user, setUser] = useState<User>({
    _id: '',
    username: '',
    email: '',
    password: '',
    createData: new Date(),
  });
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleLogin = async () => {
    setLoading(true);

    if (username.trim() === '') {
      Alert.alert('Please enter a username');
      setLoading(false);
      return;
    }
    if (password.trim() === '') {
      Alert.alert('Please enter a password');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(API_BASE_URL + API_USERS_ENDPOINT + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(prevUser => ({
          ...prevUser,
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
        }));
        navigation.replace('Home');
      } else {
        const errorData = await response.json();
        Alert.alert('Login failed', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login failed', 'An error occurred during login.');
    }

    setLoading(false);
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
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text>{user.email}</Text>
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create an Account" onPress={handleCreateAccount} />
      <Text>
        {loading ? "Loading..." : ""}
      </Text>
    </View>
  );
};

export default LoginScreen;