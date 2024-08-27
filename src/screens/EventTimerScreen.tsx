import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type EventTimerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventTimer'>;

export default function EventTimerScreen() {
  const navigation = useNavigation<EventTimerScreenNavigationProp>();
  const [eventName, setEventName] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [intervalDuration, setIntervalDuration] = useState('');

  const startEventTimer = () => {
    if (!eventName || !totalDuration || !intervalDuration) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const totalMinutes = parseInt(totalDuration);
    const intervalMinutes = parseInt(intervalDuration);

    if (totalMinutes <= 0 || intervalMinutes <= 0 || totalMinutes < intervalMinutes) {
      Alert.alert('Error', 'Invalid duration values');
      return;
    }

    // Here you would typically set up the event timer in your app's state or context
    // For now, we'll just navigate back to the home screen
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={['#3b5998', '#192f6a']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Create Event Timer</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        placeholderTextColor="#ccc"
        value={eventName}
        onChangeText={setEventName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Total Duration (minutes)"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={totalDuration}
        onChangeText={setTotalDuration}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Interval Duration (minutes)"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={intervalDuration}
        onChangeText={setIntervalDuration}
      />
      
      <TouchableOpacity style={styles.startButton} onPress={startEventTimer}>
        <Text style={styles.startButtonText}>Start Event Timer</Text>
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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4ecdc4',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});