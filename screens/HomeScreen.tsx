import React from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import styles from '../components/styles';
import { useEffect, useState } from 'react';

const HomeScreen = ({ navigation }) => {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fit Net</Text>
        <Text>{message}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Welcome to your fitness journey!</Text>
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