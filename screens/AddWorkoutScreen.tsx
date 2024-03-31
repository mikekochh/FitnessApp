import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';

const AddWorkoutScreen = ({ navigation }) => {
  const [workoutLength, setWorkoutLength] = useState('');
  const [exercisesHit, setExercisesHit] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleSubmit = () => {
    if (workoutLength.trim() !== '') {
      const exercises = exercisesHit.split(',').map(exercise => exercise.trim());
      const newWorkout = {
        length: workoutLength,
        exercises: exercises,
      };
      setWorkouts([...workouts, newWorkout]);
      setWorkoutLength('');
      setExercisesHit('');
    }
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutLength}>Length: {item.length}</Text>
      <View style={styles.exercisesContainer}>
        {item.exercises.map((exercise, index) => (
          <Text key={index} style={styles.exercise}>
            {exercise}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Workout Length"
        value={workoutLength}
        onChangeText={setWorkoutLength}
      />
      <TextInput
        style={styles.input}
        placeholder="Exercises Hit (comma-separated)"
        value={exercisesHit}
        onChangeText={setExercisesHit}
      />
      <Button title="Submit" onPress={handleSubmit} />

      <View style={styles.workoutsContainer}>
        <FlatList
          data={workouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Button title="Back" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  workoutsContainer: {
    marginTop: 16,
  },
  workoutItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 8,
  },
  workoutLength: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exercisesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exercise: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
});

export default AddWorkoutScreen;