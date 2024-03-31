import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExerciseScreen from './screens/AddExerciseScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  return (
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
          name="AddWorkout"
          component={AddWorkoutScreen}
          options={{ title: 'Add Workout Exercise' }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;