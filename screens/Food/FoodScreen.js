import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FoodScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const route = useRoute(); // Access route parameters
  const { suggestions } = route.params; // Get suggestions from route parameters
  const { mappedCost } = route.params; // Get suggestions from route parameters

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    navigation.navigate('Activities', { selectedValue: option });
    navigation.navigate('Activities', { suggestions, mappedCost});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Food Preference:</Text>
      <TouchableOpacity
        style={[styles.button, selectedOption === 'Veg' && styles.selectedButton]}
        onPress={() => handleSelectOption('Veg')}>
        <Text>Veg</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedOption === 'Non-veg' && styles.selectedButton]}
        onPress={() => handleSelectOption('Non-veg')}>
        <Text>Non-veg</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedOption === 'Vegan' && styles.selectedButton]}
        onPress={() => handleSelectOption('Vegan')}>
        <Text>Vegan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedOption === 'Skip' && styles.selectedButton]}
        onPress={() => handleSelectOption('Skip')}>
        <Text>Skip</Text>
      </TouchableOpacity>

      {/* Render suggestions */}
      <Text>Suggestions:</Text>
      {suggestions.map((item, index) => (
        <Text key={index}>{item.name} - {item.price_level}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
    minWidth: 100,
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'lightblue',
  },
});

export default FoodScreen;
