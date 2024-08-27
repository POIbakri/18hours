import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Alarm } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [newAlarmName, setNewAlarmName] = useState('');

  useEffect(() => {
    loadAlarms();
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadAlarms = async () => {
    try {
      const savedAlarms = await AsyncStorage.getItem('alarms');
      if (savedAlarms) {
        setAlarms(JSON.parse(savedAlarms));
      }
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      if (uri && newAlarmName) {
        const newAlarm: Alarm = {
          id: Date.now().toString(),
          name: newAlarmName,
          uri: uri,
          type: 'custom',            // Default or chosen type
          interval: 1,               // Default or chosen interval
          repeatDays: [],            // Default or chosen repeat days
          sound: 'Default',          // Default or chosen sound
        };
        const updatedAlarms = [...alarms, newAlarm];
        setAlarms(updatedAlarms);
        await AsyncStorage.setItem('alarms', JSON.stringify(updatedAlarms));
        setNewAlarmName('');
      } else {
        Alert.alert('Error', 'Please provide a name for the alarm.');
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };
  

  const playSound = async (uri: string) => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: uri });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  const deleteAlarm = async (id: string) => {
    const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
    setAlarms(updatedAlarms);
    await AsyncStorage.setItem('alarms', JSON.stringify(updatedAlarms));
  };

  const renderAlarm = ({ item }: { item: Alarm }) => (
    <View style={styles.alarmItem}>
      <Text style={styles.alarmName}>{item.name}</Text>
      <View style={styles.alarmButtons}>
        <TouchableOpacity style={styles.playButton} onPress={() => playSound(item.uri)}>
          <Ionicons name="play" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAlarm(item.id)}>
          <Ionicons name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle" size={100} color="#fff" />
        <Text style={styles.username}>John Doe</Text>
      </View>
      
      <View style={styles.alarmsContainer}>
        <Text style={styles.sectionTitle}>Custom Alarms</Text>
        <FlatList
          data={alarms}
          renderItem={renderAlarm}
          keyExtractor={item => item.id}
        />
      </View>
      
      <View style={styles.recordContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Alarm Name"
          placeholderTextColor="#ccc"
          value={newAlarmName}
          onChangeText={setNewAlarmName}
        />
        <TouchableOpacity 
          style={styles.recordButton}
          onPress={recording ? stopRecording : startRecording}
        >
          <Ionicons name={recording ? "stop" : "mic"} size={24} color="#fff" />
          <Text style={styles.recordButtonText}>
            {recording ? 'Stop Recording' : 'Record New Alarm'}
          </Text>
        </TouchableOpacity>
      </View>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  alarmsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  alarmName: {
    fontSize: 18,
    color: '#fff',
  },
  alarmButtons: {
    flexDirection: 'row',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 5,
  },
  recordContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    marginBottom: 10,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6b6b',
    borderRadius: 20,
    padding: 15,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});