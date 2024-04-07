import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';
import { API_BASE_URL, API_EXERCISES_ENDPOINT, API_SETS_ENDPOINT } from '../components/constants';
import { Exercise, Set } from '../components/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../components/context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';

const StartWorkoutScreen = ({ navigation }) => {
  const [searchExercise, setSearchExercise] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [userSets, setUserSets] = useState<Set[]>([]);

  const { workout } = useContext(AuthContext) ?? {};

  useEffect(() => {
    const handleSearch = () => {
      const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchExercise.toLowerCase())
      );
      setFilteredExercises(filteredExercises);
    };

    handleSearch();
  }, [searchExercise])

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserSets = async () => {
        try {
          const response = await fetch(API_BASE_URL + API_SETS_ENDPOINT + "/workoutID/" + workout?.workoutID);
          if (response.ok) {
            const data = await response.json();
            setUserSets(data);
          }
          else {
            console.error('Error fetching user sets: ', response.status);
          }
        }
        catch (error) {
          console.error('Error fetching user sets: ', error);
        }
      };
  
      fetchUserSets();
    }, [workout?.workoutID])
  );

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_BASE_URL + API_EXERCISES_ENDPOINT);
        if (response.ok) {
          const data = await response.json();
          setExercises(data);
          setFilteredExercises(data);
        } else {
          console.error('Error fetching exercises:', response.status);
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const renderWorkoutItem = ({ item }: { item: Exercise }) => (
    <View style={styles.workoutItem}>
      <TouchableOpacity onPress={() => navigation.navigate('AddExerciseToWorkout', { exercise: item })}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: 20 }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // const renderExerciseItem = () => {

  //   // were going to need to find all the different types of exercise IDs, and then make a exercise box for each
  //   // one of them and then aggregate the sets within the box

  //   const totalWeight = userSets.reduce((total, set) => total + set.reps * set.weight, 0);

  //   const exercise = exercises.find(ex => ex._id === userSets[0].exerciseID);

  //   return (
  //     <View>
  //       <Text>{exercise?.name}</Text>
  //       <Text>{totalWeight} {userSets[0].weightUnit}</Text>
  //     </View>
  //   )
  // }

  const renderExerciseItem = () => {
    // Group the sets by exerciseID
    const groupedSets = userSets.reduce((groups, set) => {
      const exerciseID = set.exerciseID;
      if (!groups[exerciseID]) {
        groups[exerciseID] = [];
      }
      groups[exerciseID].push(set);
      return groups;
    }, {});
  
    // Render a box for each exercise
    return Object.entries(groupedSets).map(([exerciseID, sets]) => {
      // Calculate the total weight for the current exercise
      const totalWeight = sets.reduce((total, set) => total + set.reps * set.weight, 0);
      
      const exercise = exercises.find(ex => ex._id === exerciseID);
  
      return (
        <View key={exerciseID} style={styles.exerciseBox}>
          <TouchableOpacity onPress={() => navigation.navigate('AddExerciseToWorkout', { exercise })}>
            <Text style={styles.exerciseName}>{exercise?.name}</Text>
            <Text style={styles.totalWeight}>{totalWeight} {userSets[0].weightUnit} moved in total</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View>
        {renderExerciseItem()}
      </View>
      {/* <View>
        {userSets.map((set, index) => (
          <View key={index}>
            {renderExerciseItem}
            <Text>Reps: {set.reps}</Text>
            <Text>Weight: {set.weight}</Text>
            <Text>Weight Unit: {set.weightUnit}</Text>
            <View style={styles.separator} />
          </View>
        ))}
      </View> */}


      <Text style={styles.title}>Search Exercises</Text>
      <TextInput
        style={styles.input}
        placeholder="Exercises"
        value={searchExercise}
        onChangeText={setSearchExercise}
      />

      <View style={styles.workoutsContainer}>
        <FlatList
          data={filteredExercises}
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
    backgroundColor: '#e0e0f0',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10
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
  separator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  exerciseBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  totalWeight: {
    fontSize: 16,
    color: '#666666',
  },
});

export default StartWorkoutScreen;