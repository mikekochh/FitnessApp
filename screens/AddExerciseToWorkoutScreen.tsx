import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, Button, Text, Image, Alert, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { API_BASE_URL, API_USERMAXWEIGHT_ENDPOINT, API_SETS_ENDPOINT } from '../components/constants';
import { Set } from '../components/types';
import { AuthContext } from '../components/context/AuthProvider';

const AddExerciseToWorkoutScreen = ({ route, navigation }) => {
    const { exercise } = route.params;
    const setRefs = useRef<Set[]>([]);
    const [sets, setSets] = useState<Set[]>([]);
    const [originalSetCount, setOriginalSetCount] = useState<number>(0);
    const [maxWeight, setMaxWeight] = useState<number>(0);

    const { workout } = useContext(AuthContext) ?? {};

    useEffect(() => {
      const findExistingSets = async () => {
        const exerciseID = exercise._id;
        try {
          const response = await fetch(API_BASE_URL + API_SETS_ENDPOINT + "/workoutID/" + workout?.workoutID);
          if (response.ok) {
            const data = await response.json();
    
            const matchingExerciseSets = data.filter(set => set.exerciseID === exerciseID);
            setSets(matchingExerciseSets);
            setOriginalSetCount(matchingExerciseSets.length);
          }
          else {
            console.error('Error fetching user sets: ', response.status);
          }
        }
        catch (error) {
          console.error('Error fetching user sets: ', error);
        }
      }

      const fetchMaxWeight = async () => {
        const exerciseID = exercise._id;
        const userID = workout?.userID;
        try {
          const response = await fetch(API_BASE_URL + API_USERMAXWEIGHT_ENDPOINT + "/" + userID + "/" + exerciseID);
          console.log("response: ", response);
          const data = await response.json()
          console.log("Data: ", data);
          console.log("maxWeight: ", data[0].maxWeight);
          setMaxWeight(data[0].maxWeight);
        } 
        catch (err) {
          console.error("error: ", err);
        }
      }
    
      findExistingSets();
      fetchMaxWeight();
    }, [])
  
    const handleAddSet = () => {
      setSets([...sets, {}]);
    };

    const handleFinishExercise = async () => {
      try {
        const newSetRefs = setRefs.current.slice(originalSetCount);
    
        // Check if any of the sets are missing weight or reps
        for (let i = 0; i < newSetRefs.length; i++) {
          const setRef = newSetRefs[i];
          const setNumber = i + 1;
    
          if (!setRef.reps) {
            Alert.alert('Please fill in reps for set ' + setNumber);
            return;
          }
          if (!setRef.weight) {
            Alert.alert('Please fill in weight for set ' + setNumber);
            return;
          }
        }
    
        // If all sets have weight and reps, proceed with the API requests
        await Promise.all(
          newSetRefs.map(async (setRef) => {
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

    const removeSet = (index) => {
      // TODO: well get back to this
      setSets((prevSets) => {
        const updatedSets = [...prevSets];
        console.log("updatedSets: ", updatedSets);
        console.log("updatedSets[index]: ", updatedSets[index]);
        updatedSets.splice(index - sets.length, 1);
        return updatedSets;
      });
    };

    const renderNewSets = () => {
      return sets?.map((set, index) => (
        <NewSetComponent
            key={index}
            index={index + 1}
            initialReps={set.reps}
            initialWeight={set.weight}
            initialWeightUnit={set.weightUnit}
            removeSet={removeSet}
            ref={(ref) => (setRefs.current[index] = ref)}
          />
      ))
    };
  
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 24, margin: 5, fontWeight: 900}}>{exercise.name}</Text>
        <Text>Max Weight: {maxWeight} lbs</Text>
        <Text>PR: </Text>
        {renderNewSets()}
        <Button title="Add a set" onPress={handleAddSet} />
        <Button title="Done" onPress={handleFinishExercise} />
      </View>
    );
  };
  
  const NewSetComponent = React.forwardRef(({ index, initialReps, initialWeight, initialWeightUnit, removeSet }, ref) => {
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Set {index}</Text>
          <TouchableOpacity onPress={() => removeSet(index)}>
            <Image
              source={require('../assets/images/trash-icon.png')}
              style={{ width: 20, height: 20, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Reps"
          value={reps}
          onChangeText={(text) => {
            const digitsOnly = text.replace(/\D/g, '');
            setReps(digitsOnly);
          }}
          keyboardType="numeric"
          style={{ fontSize: 18, padding: 5, borderWidth: 1, borderColor: 'gray', marginBottom: 10, width: '20%' }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Weight"
            value={weight}
            onChangeText={(text) => {
              const digitsOnly = text.replace(/\D/g, '');
              setWeight(digitsOnly);
            }}
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