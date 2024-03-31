import React from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import styles from '../components/styles';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fit Net</Text>
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