import React, { useContext } from 'react';
import { SafeAreaView, Button, Text, View } from 'react-native';
import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';

const HomeScreen = ({ navigation }) => {

  const { user, handleLogout } = useContext(AuthContext) ?? {};

  const handleLogoutPress = () => {
    handleLogout?.(navigation);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fit Net</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {user ? `Welcome back ${user.username}!` : "Login"}</Text>
        <Button
          title="Add New Exercise"
          onPress={() => navigation.navigate('AddExercise')}
          color="#1e88e5"
        />
        <Button
          title="Add New Workout"
          onPress={() => navigation.navigate('AddWorkout')}
          color="#1e88e5"
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          color="#1e88e5"
        />
        <Button
          title="Logout"
          onPress={handleLogoutPress}
          color="#1e88e5"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;