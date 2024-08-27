import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { createThemedStyles, colors } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

type AlarmScreenRouteProp = RouteProp<RootStackParamList, 'Alarm'>;

export default function AlarmScreen() {
  const route = useRoute<AlarmScreenRouteProp>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);

  const [alarm, setAlarm] = useState<{ id: string; name: string; type: string; interval: number } | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadAlarm();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (isActive && alarm) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            playSound();
            return alarm.interval * 60;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, alarm]);

  async function loadAlarm() {
    try {
      const savedAlarms = await AsyncStorage.getItem('alarms');
      if (savedAlarms) {
        const alarms = JSON.parse(savedAlarms);
        const currentAlarm = alarms.find((a: any) => a.id === route.params.alarmId);
        if (currentAlarm) {
          setAlarm(currentAlarm);
          setTimeLeft(currentAlarm.interval * 60);
        }
      }
    } catch (error) {
      console.error('Failed to load alarm:', error);
    }
  }

  async function playSound() {
    try {
      console.log("Playing alarm sound");
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/alarm-sound.mp3')
      );
      setSound(sound);
      await sound.playAsync();
      scheduleNotification();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  async function scheduleNotification() {
    if (alarm) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: alarm.name,
          body: `Time for your ${alarm.type} alarm!`,
        },
        trigger: null,
      });
    }
  }

  function toggleAlarm() {
    setIsActive(!isActive);
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  if (!alarm) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Alarm not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Ionicons name="arrow-back" size={24} color={colors[theme].text} />
      </TouchableOpacity>
      <Text style={styles.title}>{alarm.name}</Text>
      <Text style={[styles.title, { fontSize: 20, marginBottom: 30 }]}>{alarm.type}</Text>
      <Text style={[styles.title, { fontSize: 48, marginBottom: 40 }]}>{formatTime(timeLeft)}</Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isActive ? colors[theme].accent : colors[theme].primary }]} 
        onPress={toggleAlarm}
      >
        <Text style={styles.buttonText}>
          {isActive ? 'Stop Alarm' : 'Start Alarm'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}