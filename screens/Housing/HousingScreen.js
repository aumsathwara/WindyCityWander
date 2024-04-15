import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const HousingScreen = () => {
  const [location, setLocation] = useState('');
  const [placeType, setPlaceType] = useState('Hotels'); // Default value
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();
  const route = useRoute(); // Access route parameters
  const { mappedCost } = route.params;

  const fetchSuggestions = async () => {
    const API_KEY = 'AIzaSyB3DRoFkT-SQhILkIbqDiaIig5jfI3rXo0';
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const params = {
      query: `${placeType} in Chicago`,
      key: API_KEY
    };

    try {
      const response = await axios.get(url, { params });
      const modifiedResults = response.data.results.map(result => ({
        ...result,
        price_level: Math.floor(Math.random() * 5) // Random price level between 0 and 4
      }));
      setSuggestions(modifiedResults);
      // navigation.navigate('Solution', { suggestions });
    } catch (error) {
      console.error("Error fetching place suggestions:", error.message);
      setSuggestions([]);
    }
  };
  const gotoFood = () => {
    navigation.navigate('Food', { suggestions, mappedCost });
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Find Housing</Text>
      <Picker
        selectedValue={placeType}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setPlaceType(itemValue)}
        >
        <Picker.Item label="Hotels" value="Hotels"  />
        <Picker.Item label="Hostels" value="Hostels" />
        <Picker.Item label="Airbnb" value="Airbnb"  />
      </Picker>
      {/* <Button title="Next" onPress={fetchSuggestions} /> */}
      
      <FlatList
        style={{ marginTop: 20 }}
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {/* Handle selection */}}>
            <Text>{item.name} - {item.price_level}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button2} onPress={fetchSuggestions}>
        <Text style={styles.buttonText}>Select These</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={gotoFood}>
        <Text style={styles.buttonText}>Go to Food</Text>
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
  button2: {
    backgroundColor: '#7300e6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'left',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default HousingScreen;
