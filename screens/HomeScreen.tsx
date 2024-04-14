import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Button, Text, View } from 'react-native';
import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

  const { 
    user, 
    handleLogout, 
    startWorkout, 
    workout, 
    handleLogin 
  } = useContext(AuthContext) ?? {};

  useEffect(() => {
    console.log("this running?");
    const checkLoginStatus = async () => {
      console.log("this should only run when no user logged in");
      try {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');

        if (username && password) {
          await handleLogin?.(username, password, navigation);
        } else {
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    if (!user) {
      checkLoginStatus();
    }
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fit Net</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {user && `Welcome back ${user.username}!`}
        </Text>
        <Button
          title="Add New Exercise"
          onPress={() => navigation.navigate('AddExercise')}
          color="#1e88e5"
        />
        {!workout ? (
        <Button
          title="Start New Workout"
          onPress={() => startWorkout?.(navigation)}
          color="#1e88e5"
        />
        ) : (
        <Button
          title="Continue Workout"
          onPress={() => navigation.navigate('StartWorkout')}
          color="#1e88e5"
        />
        )}
        <Button 
          title="View Past Workouts"
          onPress={() => navigation.navigate('PastWorkouts')}
          color="#1e88e5"
        />
        {!user ? 
          (
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
            color="#1e88e5"
          />
          ) : 
          (
          <Button
            title="Logout"
            onPress={() => handleLogout?.(navigation)}
            color="#1e88e5"
          />
          )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;