import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, Alarm } from '../types';
import { useTheme } from '../context/ThemeContext';
import { createThemedStyles, colors, shadowStyle } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { TimerContext } from '../context/TimerContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { remainingTime, isActive, pauseTimer, resumeTimer, stopTimer } = useContext(TimerContext);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient colors={['#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.title}>Eighteen Hours</Text>
      <Text style={styles.timerDisplay}>{formatTime(remainingTime)}</Text>
      <View style={styles.buttonContainer}>
        {isActive ? (
          <TouchableOpacity style={styles.button} onPress={pauseTimer}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : remainingTime > 0 ? (
          <TouchableOpacity style={styles.button} onPress={resumeTimer}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        ) : null}
        {remainingTime > 0 && (
          <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopTimer}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.newTimerButton} onPress={() => navigation.navigate('CustomTimer')}>
        <Text style={styles.buttonText}>New Timer</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  timerDisplay: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4ecdc4',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
  },
  stopButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newTimerButton: {
    backgroundColor: '#f39c12',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
});

const localStyles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});