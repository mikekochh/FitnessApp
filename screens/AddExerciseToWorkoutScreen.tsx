import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { API_BASE_URL, API_SETS_ENDPOINT } from '../components/constants';
import { Set } from '../components/types';
import { AuthContext } from '../components/context/AuthProvider';

const AddExerciseToWorkoutScreen = ({ route, navigation }) => {
    const { exercise } = route.params;
    const [setCount, setSetCount] = useState(0);
    const setRefs = useRef<Set[]>([]);
    const [sets, setSets] = useState();

    const { workout } = useContext(AuthContext) ?? {};

    useEffect(() => {
      const findExistingSets = async () => {
        const exerciseID = exercise._id;
        console.log("exerciseID: ", exerciseID);
        try {
          const response = await fetch(API_BASE_URL + API_SETS_ENDPOINT + "/workoutID/" + workout?.workoutID);
          if (response.ok) {
            const data = await response.json();
            console.log("data: ", data);
    
            // Check if any set matches the exerciseID
            const matchingExerciseSets = data.filter(set => set.exerciseID === exerciseID);
            setSets(matchingExerciseSets);
            console.log("matchingSets: ", sets);
          }
          else {
            console.error('Error fetching user sets: ', response.status);
          }
        }
        catch (error) {
          console.error('Error fetching user sets: ', error);
        }
      }
    
      findExistingSets();
    }, [])
  
    const handleAddSet = () => {
      setSetCount(prevCount => prevCount + 1);
    };

    const handleFinishExercise = async () => {
        try {
          await Promise.all(
            setRefs.current.map(async (setRef) => {
              const response = await fetch(API_BASE_URL + API_SETS_ENDPOINT, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  workoutID: workout?.workoutID,
                  exerciseID: exercise._id,
                  reps: parseInt(setRef.reps),
                  weight: parseFloat(setRef.weight),
                  weightUnit: setRef.weightUnit,
                }),
              });
      
              if (!response.ok) {
                throw new Error('Failed to save set data');
              }
            })
          );
      
          console.log('All sets saved successfully');
          navigation.navigate("StartWorkout");
        } catch (error) {
          console.error('Error saving sets:', error);
        }
      };
  
      const renderNewSets = () => {
        if (sets?.length > 0) {
          return sets?.map((set, index) => (
            <NewSetComponent
              key={index}
              index={index + 1}
              initialReps={set.reps}
              initialWeight={set.weight}
              initialWeightUnit={set.weightUnit}
              ref={(ref) => (setRefs.current[index] = ref)}
            />
          ));
        } else {
          const sets = [];
          for (let i = 0; i < setCount; i++) {
            sets.push(<NewSetComponent key={i} index={i + 1} ref={(ref) => (setRefs.current[i] = ref)} />);
          }
          return sets;
        }
      };
  
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 24, margin: 5, fontWeight: 900}}>{exercise.name}</Text>
        {renderNewSets()}
        <Button title="Add a set" onPress={handleAddSet} />
        <Button title="Done" onPress={handleFinishExercise} />
      </View>
    );
  };
  
  const NewSetComponent = React.forwardRef(({ index, initialReps, initialWeight, initialWeightUnit }, ref) => {
    const [reps, setReps] = useState(initialReps ? initialReps.toString() : '');
    const [weight, setWeight] = useState(initialWeight ? initialWeight.toString() : '');
    const [weightUnit, setWeightUnit] = useState(initialWeightUnit || 'lbs');
  
    React.useImperativeHandle(ref, () => ({
      reps,
      weight,
      weightUnit,
    }));
  
    return (
      <View>
        <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>Set {index}</Text>
        <TextInput
          placeholder="Reps"
          value={reps}
          onChangeText={setReps}
          keyboardType="numeric"
          style={{ fontSize: 18, padding: 5, borderWidth: 1, borderColor: 'gray', marginBottom: 10, width: '20%' }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={{ fontSize: 18, padding: 5, borderWidth: 1, borderColor: 'gray', marginRight: 10, flex: 1, width: "20%" }}
          />
          <RNPickerSelect
            value={weightUnit}
            onValueChange={(value) => setWeightUnit(value)}
            items={[
              { label: 'lbs', value: 'lbs' },
              { label: 'kg', value: 'kg' },
            ]}
            style={{
              inputIOS: {
                fontSize: 18,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                width: 100,
              },
              inputAndroid: {
                fontSize: 18,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                width: 100,
              },
            }}
          />
        </View>
      </View>
    );
  });

export default AddExerciseToWorkoutScreen;