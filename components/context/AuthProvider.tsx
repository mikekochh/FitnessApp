// AuthContext.tsx
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL, API_USERS_ENDPOINT, API_WORKOUTS_ENDPOINT } from '../constants';
import { User, Workout } from '../types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  workout: Workout | null;
  handleLogin: (username: string, password: string, navigation: any) => Promise<void>;
  handleLogout: (navigation: any) => void;
  handleCreateAccount: (username: string, password: string, email: string, navigation: any) => Promise<void>;
  startWorkout: (navigation: any) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState<Workout | null>(null);

  const startWorkout = async (navigation: any) => {
    console.log("starting new workout...");
    if (!user) {
      Alert.alert("Please sign in or create an account to continue");
      return;
    }

    try {

      console.log("userID: ", user.id);

      const response = await fetch(API_BASE_URL + API_WORKOUTS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: user.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);
        setWorkout({
          workoutID: data._id,
          userID: user.id,
        });
        navigation.replace('StartWorkout');
      } else {
        const errorData = await response.json();
        Alert.alert('Starting new workout failed', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Start Workout failed', 'An error occurred during starting workout.');
    }
  }

  const handleLogin = async (username: string, password: string, navigation: any) => {
    console.log("logging in...");
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
        setUser({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
        });
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

  const handleCreateAccount = async (username: string, password: string, email: string, navigation: any) => {

    setLoading(true);

    const checkUsername = await fetch(API_BASE_URL + API_USERS_ENDPOINT + "/username/" + username)
    const jsonUsername = await checkUsername.json();

    if (jsonUsername.username) {
      Alert.alert('An account with this username already exists');
      setLoading(false);
      return;
    }

    const checkEmail = await fetch(API_BASE_URL + API_USERS_ENDPOINT + "/email/" + email)
    const jsonEmail = await checkEmail.json();

    if (jsonEmail.email) {
      Alert.alert('An account with this email address already exists');
      setLoading(false);
      return;
    }

    if (username.trim() === '') {
      Alert.alert('Please enter a valid username');
      setLoading(false);
      return;
    }
    if (email.trim() === '') {
      Alert.alert('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (password.trim() === '') {
      Alert.alert('Please enter a valid password');
      setLoading(false);
      return;
    }

    const response = await fetch(API_BASE_URL + API_USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: username,
          email: email,
          password: password,
      }),
    });

    if (response.ok) {
      handleLogin(username, password, navigation);
    } else {
      const errorData = await response.json();
      Alert.alert('Account creation failed', errorData.message);
    }

    setLoading(false);
  };


  const handleLogout = (navigation: any) => {
    setUser(null);
    navigation.replace('Home');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      handleLogin, 
      handleCreateAccount, 
      handleLogout,
      workout,
      startWorkout
    }}>
      {children}
    </AuthContext.Provider>
  );
};