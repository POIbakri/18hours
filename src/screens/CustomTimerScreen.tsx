import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { TimerContext } from '../context/TimerContext'; // Assume this exists

type CustomTimerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CustomTimer'>;

export default function CustomTimerScreen() {
  const navigation = useNavigation<CustomTimerScreenNavigationProp>();
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const { startTimer } = useContext(TimerContext);

  const validateAndStartTimer = () => {
    const hoursNum = parseInt(hours);
    const minutesNum = parseInt(minutes);

    if (isNaN(hoursNum) || isNaN(minutesNum) || hoursNum < 0 || minutesNum < 0 || minutesNum > 59) {
      Alert.alert('Invalid Input', 'Please enter valid numbers for hours and minutes.');
      return;
    }

    if (hoursNum === 0 && minutesNum === 0) {
      Alert.alert('Invalid Duration', 'Timer duration must be greater than 0.');
      return;
    }

    const totalSeconds = hoursNum * 3600 + minutesNum * 60;
    startTimer(totalSeconds);
    navigation.navigate('Home');
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue.toString());
    }
  };

  return (
    <LinearGradient
      colors={['#3b5998', '#192f6a']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Custom Timer</Text>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={hours}
            onChangeText={handleInputChange(setHours)}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.inputLabel}>Hours</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={minutes}
            onChangeText={handleInputChange(setMinutes)}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.inputLabel}>Minutes</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.startButton} onPress={validateAndStartTimer}>
        <Text style={styles.startButtonText}>Start Timer</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  inputWrapper: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    fontSize: 24,
    color: '#fff',
    width: 100,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#4ecdc4',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});