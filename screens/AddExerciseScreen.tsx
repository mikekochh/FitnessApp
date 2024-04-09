import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { Exercise } from '../components/types';
import styles from '../components/styles';
import { API_BASE_URL, API_EXERCISES_ENDPOINT } from '../components/constants';
import { AuthContext } from '../components/context/AuthProvider';

const AddExerciseScreen = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState<string>('');
  const [primaryMuscleGroup, setPrimaryMuscleGroup] = useState('');
  const [secondaryMuscleGroup, setSecondaryMuscleGroup] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const { user } = useContext(AuthContext) ?? {};

  const handleSubmit = () => {
    const newExercise = {
      name: exerciseName,
      primaryMuscleGroup,
      secondaryMuscleGroup,
      userID: user?.id || '',
    };

    setExercises(prevExercises => [...prevExercises, newExercise]);
  
    fetch(API_BASE_URL + API_EXERCISES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExercise),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Exercise submitted successfully:", result);
      })
      .catch((error) => {
        console.error("Error submitting exercise:", error);
      });
  };

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

  const renderExerciseItem = ({ item }) => (
    <View style={{
      backgroundColor: '#e0e0e0',
      padding: 12,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <View>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={{fontSize: 12}}>{item.primaryMuscleGroup}</Text>
      </View>
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