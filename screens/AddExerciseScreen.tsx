import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';
import { Exercise } from '../components/types';
import styles from '../components/styles';
import { API_BASE_URL, API_EXERCISES_ENDPOINT } from '../components/constants';

const AddExerciseScreen = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [primaryMuscleGroup, setPrimaryMuscleGroup] = useState('');
  const [secondaryMuscleGroup, setSecondaryMuscleGroup] = useState('');
  const [exercises, setExercises] = useState([]);

  const userID = "60a1c5f0a5d4f8a0b8c9d1e2";

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_BASE_URL + API_EXERCISES_ENDPOINT);
        console.log("response: ", response);
        if (response.ok) {
          const data = await response.json();
          setExercises(data);
        } else {
          console.error('Error fetching exercises:', response.status);
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = () => {
    const data = {
      name: exerciseName,
      primaryMuscleGroup,
      secondaryMuscleGroup,
      userID,
    };
  
    fetch(API_BASE_URL + API_EXERCISES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Exercise submitted successfully:", result);
      })
      .catch((error) => {
        console.error("Error submitting exercise:", error);
      });
  };

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Exercise Name"
            value={exerciseName}
            onChangeText={setExerciseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Primary Muscle Group"
            value={primaryMuscleGroup}
            onChangeText={setPrimaryMuscleGroup}
          />
          <TextInput
            style={styles.input}
            placeholder="Secondary Muscle Group"
            value={secondaryMuscleGroup}
            onChangeText={setSecondaryMuscleGroup}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
      <View style={styles.exercisesContainer}>
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Button title="Back" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default AddExerciseScreen;