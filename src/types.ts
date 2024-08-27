export type RootStackParamList = {
    Home: undefined;
    Alarm: { alarmId: string };
    CreateAlarm: undefined;
    CustomTimer: undefined;
    Profile: undefined;
    EventTimer: undefined;
  };
  
  export interface Alarm {
    id: string;
    name: string;
    uri: string;
    type: string;
    interval: number;
  }