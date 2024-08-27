import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type Alarm = {
  id: string;
  name: string;
  type: string;
  interval: number;
};

export type RootStackParamList = {
  Home: undefined;
  Alarm: { alarm: Alarm };
  CreateAlarm: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type AlarmScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Alarm'>;
export type CreateAlarmScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAlarm'>;