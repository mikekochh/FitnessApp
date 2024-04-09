import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExerciseScreen from './screens/AddExerciseScreen';
import StartWorkoutScreen from './screens/StartWorkoutScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import AddExerciseToWorkoutScreen from './screens/AddExerciseToWorkoutScreen';
import PastWorkoutScreen from './screens/PastWorkoutScreen';
import 'react-native-gesture-handler';
import { AuthProvider } from './components/context/AuthProvider';

const Stack = createStackNavigator();

const App = () => {

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="AddExercise"
            component={AddExerciseScreen}
            options={{ title: 'Add New Exercise' }}
          />
          <Stack.Screen
            name="StartWorkout"
            component={StartWorkoutScreen}
            options={{ title: 'Your Workout' }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccountScreen}
            options={{ title: 'Create an Account' }}
          />
          <Stack.Screen 
            name="AddExerciseToWorkout"
            component={AddExerciseToWorkoutScreen}
            options={{ title: "Add Exercise"}}
          />
          <Stack.Screen 
            name="PastWorkouts"
            component={PastWorkoutScreen}
            options={{ title: "Workouts"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    
  );
};

export default App;