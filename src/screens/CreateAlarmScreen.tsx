import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Alarm } from '../types';
import { useTheme } from '../context/ThemeContext';
import { createThemedStyles, colors } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

type CreateAlarmScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAlarm'>;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SOUNDS = ['Default', 'Chime', 'Bell', 'Cosmic'];

export default function CreateAlarmScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState('custom');
  const [interval, setInterval] = useState('1');
  const [sound, setSound] = useState('Default');
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const navigation = useNavigation<CreateAlarmScreenNavigationProp>();
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);

  async function handleCreateAlarm() {
    if (!name) {
      Alert.alert('Error', 'Please enter a name for the alarm');
      return;
    }

    const newAlarm: Alarm = {
      id: Date.now().toString(),
      name,
      type,
      interval: parseInt(interval),
      sound,
      repeatDays,
    };

    try {
      const existingAlarms = await AsyncStorage.getItem('alarms');
      const alarms: Alarm[] = existingAlarms ? JSON.parse(existingAlarms) : [];
      alarms.push(newAlarm);
      await AsyncStorage.setItem('alarms', JSON.stringify(alarms));
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save alarm:', error);
      Alert.alert('Error', 'Failed to save alarm. Please try again.');
    }
  }

  function toggleDay(day: string) {
    setRepeatDays(prevDays => 
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day]
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Ionicons name="arrow-back" size={24} color={colors[theme].text} />
      </TouchableOpacity>
      <Text style={styles.title}>Create New Alarm</Text>
      <TextInput
        style={styles.input}
        placeholder="Alarm Name"
        placeholderTextColor={colors[theme].text}
        value={name}
        onChangeText={setName}
      />
      <View style={[styles.card, { marginBottom: 15 }]}>
        <Text style={styles.subtitle}>Alarm Type</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={{ color: colors[theme].text }}
        >
          <Picker.Item label="Custom" value="custom" />
          <Picker.Item label="Dinner" value="dinner" />
          <Picker.Item label="Workout" value="workout" />
          <Picker.Item label="Shower" value="shower" />
        </Picker>
      </View>
      <View style={[styles.card, { marginBottom: 15 }]}>
        <Text style={styles.subtitle}>Interval</Text>
        <Picker
          selectedValue={interval}
          onValueChange={(itemValue) => setInterval(itemValue)}
          style={{ color: colors[theme].text }}
        >
          <Picker.Item label="1 minute" value="1" />
          <Picker.Item label="2 minutes" value="2" />
          <Picker.Item label="5 minutes" value="5" />
          <Picker.Item label="10 minutes" value="10" />
        </Picker>
      </View>
      <View style={[styles.card, { marginBottom: 15 }]}>
        <Text style={styles.subtitle}>Sound</Text>
        <Picker
          selectedValue={sound}
          onValueChange={(itemValue) => setSound(itemValue)}
          style={{ color: colors[theme].text }}
        >
          {SOUNDS.map(s => (
            <Picker.Item key={s} label={s} value={s} />
          ))}
        </Picker>
      </View>
      <View style={[styles.card, { marginBottom: 15 }]}>
        <Text style={styles.subtitle}>Repeat</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {DAYS.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                localStyles.dayButton,
                {
                  backgroundColor: repeatDays.includes(day) ? colors[theme].primary : 'transparent',
                  borderColor: colors[theme].text,
                }
              ]}
              onPress={() => toggleDay(day)}
            >
              <Text
                style={[
                  localStyles.dayButtonText,
                  { color: repeatDays.includes(day) ? '#FFFFFF' : colors[theme].text }
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreateAlarm}>
        <Text style={styles.buttonText}>Create Alarm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  dayButton: {
    width: '30%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
  },
  dayButtonText: {
    fontSize: 16,
  },
});