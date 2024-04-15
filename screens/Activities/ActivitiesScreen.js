import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ActivitiesScreen = () => {
  const apiKey = "5ae2e3f221c38a28845f05b63c4bcf8458472b3e0c758429a7a014e8";
  const [places, setPlaces] = useState([]);
  const navigation = useNavigation();
  const route = useRoute(); // Access route parameters
  const { suggestions } = route.params;
  const { mappedCost } = route.params;
  // const { selectedOption } = route.params;


  useEffect(() => {
    const latitude = 41.8781; // Chicago latitude
    const longitude = -87.6298; // Chicago longitude

    fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const topTenPlaces = data.features.slice(0, 10); // Get only the top ten places
        setPlaces(topTenPlaces);
      })
      .catch(error => {
        console.error("Error fetching places:", error);
      });
  }, []);

  const goToSolutionScreen = () => {
    navigation.navigate('Solution', { places, suggestions, mappedCost });
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={goToSolutionScreen}>
        <Text style={styles.buttonText}>Go Ahead</Text>
      </TouchableOpacity>
      <Text>Top Ten Places:</Text>
      {places && places.length > 0 ? (
        places.map(place => (
          <Text key={place.properties.xid}>{place.properties.name}</Text>
        ))
      ) : (
        <Text>No places found</Text>
      )}
       <Text>Suggestions:</Text>
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((item, index) => (
          <Text key={index}>{item.name} - {item.price_level}</Text>
        ))
      ) : (
        <Text>No suggestions found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7300e6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ActivitiesScreen;
