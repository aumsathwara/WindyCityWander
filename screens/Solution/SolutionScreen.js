import React from 'react';
import { View, Text, ScrollView} from 'react-native';

const SolutionScreen = ({ route }) => {
  const { places } = route.params;
  const { suggestions } = route.params;
  const { mappedCost } = route.params;
  

  return (
    <ScrollView>
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Itinerary 1:</Text>

      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Activity Options:</Text>
      {places && places.length > 0 ? (
        places.slice(0, 5).map((place, index) => (
          <Text key={index}>Activity {index + 1}: {place.properties.name}</Text>
        ))
      ) : (
        <Text>No activity options found</Text>
      )}

      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Housing Options:</Text>
      {suggestions && suggestions.length > 0 ? (
        suggestions.slice(0, 3).map((item, index) => (
          <Text key={index}>House {index + 1}: {item.name} - {item.price_level}</Text>
        ))
      ) : (
        <Text>No housing options found</Text>
      )}
      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Food Options:</Text>
      {suggestions && suggestions.length > 0 ? (
        suggestions.slice(4, 6).map((item, index) => (
          <Text key={index}>Food {index + 1}: {item.name} - {item.price_level}</Text>
        ))
      ) : (
        <Text>No Food options found</Text>
      )}

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Itinerary 2:</Text>

      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Activity Options:</Text>
      {places && places.length > 0 ? (
        places.slice(5, 10).map((place, index) => (
          <Text key={index}>Activity {index + 1}: {place.properties.name}</Text>
        ))
      ) : (
        <Text>No activity options found</Text>
      )}

      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Housing Options:</Text>
      {suggestions && suggestions.length > 0 ? (
        suggestions.slice(3, 13).map((item, index) => (
          <Text key={index}>House {index + 1}: {item.name} - {item.price_level}</Text>
        ))
      ) : (
        <Text>No housing options found</Text>
      )}
      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>Food Options:</Text>
      {suggestions && suggestions.length > 0 ? (
        suggestions.slice(6, 11).map((item, index) => (
          <Text key={index}>Food {index + 1}: {item.name} - {item.price_level}</Text>
        ))
      ) : (
        <Text>No Food options found</Text>
      )}

      
    </View>
    </ScrollView>
  );
};

export default SolutionScreen;
