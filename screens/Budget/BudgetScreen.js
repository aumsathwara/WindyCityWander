import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

const BudgetScreen = () => {
  const route = useRoute(); // Access route parameters

  const { duration, numberOfPeople } = route.params; // Assuming you have duration passed as well
  const navigation = useNavigation();
  // Use useState to manage the user's input, validation state, per-day cost, cost per person, and mappedCost
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(true); // Flag for valid input
  const [perDayCost, setPerDayCost] = useState(null); // Per-day cost (initially null)
  const [costPerPerson, setCostPerPerson] = useState(null); // Cost per person (initially null)
  const [mappedCost, setMappedCost] = useState(null); // Mapped cost (0 to 4 scale)

  // Function to handle input change and validation
  const handleInputChange = (text) => {
    const newInput = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setUserInput(newInput);

    // Validate the input (check if it's a non-negative number)
    setIsValid(parseFloat(newInput) >= 0);

    // Calculate per-day cost (if input is valid)
    if (newInput !== '' && duration > 0) { // Handle division by zero
      setPerDayCost(parseFloat(newInput) / duration);
    } else {
      setPerDayCost(null); // Reset per-day cost if input is invalid or duration is 0
    }

    // Calculate cost per person (if both perDayCost and numberOfPeople are valid)
    if (perDayCost !== null && numberOfPeople > 0) { // Handle division by zero
      setCostPerPerson(perDayCost / numberOfPeople);
    } else {
      setCostPerPerson(null); // Reset cost per person if either perDayCost or numberOfPeople is invalid
    }

    // Calculate and store mapped cost (if perDayCost is valid)
    if (perDayCost !== null) {
      const maxCost = 100; // Define your maximum expected cost here (e.g., 100)
      const mappedCost = Math.min(4, Math.floor(perDayCost / (maxCost / 4))); // Clamp to 0-4 range
      setMappedCost(mappedCost);
    } else {
      setMappedCost(null); // Reset mappedCost if perDayCost is invalid
    }
  };
  const gotoHousing = () => {
    navigation.navigate('Housing', { mappedCost });
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Conditionally render travelling duration (prevents error) */}
      {route.params && (
        <Text>Travelling Duration: {duration} </Text>
      )}
      <Text>Number of People: {numberOfPeople} </Text>
      <TextInput
        style={{ borderWidth: 1, padding: 5, marginVertical: 10 }}
        placeholder="Enter budget amount"
        keyboardType="numeric" // Suggest numeric keyboard for budget input
        onChangeText={handleInputChange}
        value={userInput}
        returnKeyType='done'
      />
      {/* Conditionally render error message based on validation state */}
      {!isValid && <Text style={{ color: 'red' }}>Please enter a valid non-negative number.</Text>}
      {/* Conditionally render per-day cost */}
      {perDayCost !== null && (
        <Text>Your per-day cost: {perDayCost.toFixed(2)}</Text>
      )}
      {/* Conditionally render cost per person */}
      {costPerPerson !== null && (
        <Text>Your cost per person: {costPerPerson.toFixed(2)}</Text>
      )}
      {/* Conditionally render mapped cost */}
      {mappedCost !== null && (
        <Text>Mapped cost (0-4 scale): {mappedCost}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={gotoHousing}>
        <Text style={styles.buttonText}>Select Budget</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  selectedDatesContainer: {
    alignItems: 'center',
  },
  selectedDatesText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#7300e6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default BudgetScreen;
