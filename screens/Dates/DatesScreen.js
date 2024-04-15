import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';

const DatesScreen = () => {
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [numberOfPeopleUnder21, setNumberOfPeopleUnder21] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const navigation = useNavigation();

  const handleSelectOption = (option) => {
    setDuration(option);
    navigation.navigate('Budget', {
      duration: option,
      numberOfPeople,
      numberOfPeopleUnder21,
    });
  };

  const onChangeTextNumberOfPeople = (value) => {
    setNumberOfPeople(value);

    // If number of people is set and number of people under 21 is greater than or equal to it, reset the value
    if (value && parseInt(value) <= parseInt(numberOfPeopleUnder21)) {
      setNumberOfPeopleUnder21('');
    }
  };

  const onChangeTextNumberOfPeopleUnder21 = (value) => {
    setNumberOfPeopleUnder21(value);

    // If number of people under 21 is greater than number of people, reset the value
    if (parseInt(value) >= parseInt(numberOfPeople)) {
      setNumberOfPeopleUnder21('');
    }
  };

  const handleDateSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      // If start date is not set or both start and end dates are set, set start date
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate && date > startDate) {
      // If end date is not set and selected date is after start date, set end date
      setEndDate(date);
    } else if (endDate) {
      // If end date is set, reset both start and end dates
      setStartDate(date);
      setEndDate(null);
    }
  };

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const diffInTime = selectedEndDate.getTime() - selectedStartDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      setDuration(diffInDays);
    } else {
      setDuration(null);
    }
  }, [selectedStartDate, selectedEndDate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Your Travel Dates</Text>
      </View>
      <View style={styles.calendarContainer}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date()}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTextNumberOfPeople}
        value={numberOfPeople}
        placeholder="Number of People"
        keyboardType="numeric"
        returnKeyType="done"
      />
      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeTextNumberOfPeopleUnder21}
        value={numberOfPeopleUnder21}
        placeholder="Number of People below 21"
        editable={parseInt(numberOfPeople) > 0}
        keyboardType="numeric"
        returnKeyType="done"
      /> */}
      <TouchableOpacity style={styles.button} onPress={() => handleSelectOption(duration)}>
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

export default DatesScreen;
