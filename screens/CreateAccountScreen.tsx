import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from '../components/styles';
import { API_BASE_URL, API_USERS_ENDPOINT } from '../components/constants';
import { AuthContext } from '../components/context/AuthProvider';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const [loading, setLoading] = useState<boolean>(false);

  const { handleLogin, loading, handleCreateAccount } = useContext(AuthContext) ?? {};

  const handleCreateAccountPress = () => {
    handleCreateAccount?.(username, password, email, navigation);
  }

  // const handleCreateAccount = async () => {

  //   setLoading(true);

  //   const checkUsername = await fetch(API_BASE_URL + API_USERS_ENDPOINT + "/username/" + username)
  //   const jsonUsername = await checkUsername.json();

  //   if (jsonUsername.username) {
  //     Alert.alert('An account with this username already exists');
  //     setLoading(false);
  //     return;
  //   }

  //   const checkEmail = await fetch(API_BASE_URL + API_USERS_ENDPOINT + "/email/" + email)
  //   const jsonEmail = await checkEmail.json();

  //   if (jsonEmail.email) {
  //     Alert.alert('An account with this email address already exists');
  //     setLoading(false);
  //     return;
  //   }

  //   if (username.trim() === '') {
  //     Alert.alert('Please enter a valid username');
  //     setLoading(false);
  //     return;
  //   }
  //   if (email.trim() === '') {
  //     Alert.alert('Please enter a valid email');
  //     setLoading(false);
  //     return;
  //   }
  //   if (password.trim() === '') {
  //     Alert.alert('Please enter a valid password');
  //     setLoading(false);
  //     return;
  //   }

  //   const response = await fetch(API_BASE_URL + API_USERS_ENDPOINT, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         username: username,
  //         email: email,
  //         password: password,
  //     }),
  //   });

  //   if (response.ok) {
  //     // User should be logged in once they create an account as well
  //     navigation.navigate('Home');
  //   } else {
  //     // Account creation failed
  //     const errorData = await response.json();
  //     Alert.alert('Account creation failed', errorData.message);
  //   }

  //   setLoading(false);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Create Account" onPress={handleCreateAccountPress} />
      <Text>
        {loading ? "Loading..." : ""}
      </Text>
    </View>
  );
};

export default CreateAccountScreen;