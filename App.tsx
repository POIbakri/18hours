import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import AlarmScreen from './src/screens/AlarmScreens';
import CreateAlarmScreen from './src/screens/CreateAlarmScreen';
import CustomTimerScreen from './src/screens/CustomTimerScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EventTimerScreen from './src/screens/EventTimerScreen';

export type RootStackParamList = {
  Home: undefined;
  Alarm: { alarmId: string };
  CreateAlarm: undefined;
  CustomTimer: undefined;
  Profile: undefined;
  EventTimer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Alarm" component={AlarmScreen} />
            <Stack.Screen name="CreateAlarm" component={CreateAlarmScreen} />
            <Stack.Screen name="CustomTimer" component={CustomTimerScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EventTimer" component={EventTimerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}