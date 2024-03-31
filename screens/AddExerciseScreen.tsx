import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';

const AddExerciseScreen = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseTags, setExerciseTags] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleSubmit = () => {
    if (exerciseName.trim() !== '') {
      const tags = exerciseTags.split(',').map(tag => tag.trim());
      const newExercise = {
        name: exerciseName,
        tags: tags,
      };
      setExercises([...exercises, newExercise]);
      setExerciseName('');
      setExerciseTags('');
    }
  };

  const renderExerciseItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Exercise</Text>
      <TextInput
        style={styles.input}
        placeholder="Exercise Name"
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags (comma-separated)"
        value={exerciseTags}
        onChangeText={setExerciseTags}
      />
      <Button title="Submit" onPress={handleSubmit} />

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
  exercisesContainer: {
    marginTop: 16,
  },
  exerciseItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
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

export default AddExerciseScreen;