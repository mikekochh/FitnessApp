import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { handleLogin, loading, handleCreateAccount } = useContext(AuthContext) ?? {};

  const handleCreateAccountPress = () => {
    handleCreateAccount?.(username, password, email, navigation);
  }

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