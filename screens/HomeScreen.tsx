import React from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import styles from '../components/styles';
import { useEffect, useState } from 'react';
import { User } from '../components/types';
import { API_BASE_URL, API_USERS_ENDPOINT } from '../components/constants';

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    fetch(API_BASE_URL + API_USERS_ENDPOINT)
      .then(response => response.json())
      .then(data => setUser(data[0]))
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fit Net</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Welcome back {user.name}!</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;