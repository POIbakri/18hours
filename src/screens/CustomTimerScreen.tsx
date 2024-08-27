import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type CustomTimerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CustomTimer'>;

export default function CustomTimerScreen() {
  const navigation = useNavigation<CustomTimerScreenNavigationProp>();
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');

  const startCustomTimer = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
    // Here you would typically set the timer in your app's state or context
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
      
      <Text style={styles.title}>Custom Timer</Text>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={hours}
            onChangeText={setHours}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.inputLabel}>Hours</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={minutes}
            onChangeText={setMinutes}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.inputLabel}>Minutes</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.startButton} onPress={startCustomTimer}>
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