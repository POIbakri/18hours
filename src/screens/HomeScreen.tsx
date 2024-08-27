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

export default function HomeScreen() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);

  useEffect(() => {
    loadAlarms();
  }, []);

  async function loadAlarms() {
    try {
      const savedAlarms = await AsyncStorage.getItem('alarms');
      if (savedAlarms) {
        setAlarms(JSON.parse(savedAlarms));
      }
    } catch (error) {
      console.error('Failed to load alarms:', error);
    }
  }

  async function deleteAlarm(id: string) {
    try {
      const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
      await AsyncStorage.setItem('alarms', JSON.stringify(updatedAlarms));
      setAlarms(updatedAlarms);
    } catch (error) {
      console.error('Failed to delete alarm:', error);
    }
  }

  function renderAlarmItem({ item }: { item: Alarm }) {
    return (
      <Animated.View style={[styles.card, shadowStyle]}>
        <TouchableOpacity onPress={() => navigation.navigate('Alarm', { alarmId: item.id })}>
          <Text style={styles.subtitle}>{item.name}</Text>
          <Text style={[styles.buttonText, { color: colors[theme].text, opacity: 0.7 }]}>
            {item.type} - Every {item.interval} min
          </Text>
          <Text style={[styles.buttonText, { color: colors[theme].text, opacity: 0.5 }]}>
            Sound: {item.sound || 'Default'}
          </Text>
          <Text style={[styles.buttonText, { color: colors[theme].text, opacity: 0.5 }]}>
            Repeat: {item.repeatDays && item.repeatDays.length > 0 ? item.repeatDays.join(', ') : 'None'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  function renderHiddenItem(data: { item: Alarm }) {
    return (
      <View style={[localStyles.rowBack, { backgroundColor: colors[theme].error }]}>
        <TouchableOpacity
          style={[localStyles.backRightBtn, localStyles.backRightBtnRight]}
          onPress={() => deleteAlarm(data.item.id)}
        >
          <Text style={localStyles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.title}>EighteenHours</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
      <SwipeListView
        data={alarms}
        renderItem={renderAlarmItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>
            No alarms yet. Create one!
          </Text>
        }
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors[theme].accent }]}
        onPress={() => navigation.navigate('CreateAlarm')}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Create New Alarm</Text>
      </TouchableOpacity>
    </View>
  );
}

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