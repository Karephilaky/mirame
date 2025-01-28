import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppointmentStackParamList } from '../types';
import AppointmentsScreen from '../../screens/Appointments/AppointmentsScreen';
import AppointmentDetailScreen from '../../screens/Appointments/AppointmentDetailScreen';
import NewAppointmentScreen from '../../screens/Appointments/NewAppointmentScreen';

const Stack = createNativeStackNavigator<AppointmentStackParamList>();

const AppointmentsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalendarMain" component={AppointmentsScreen} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
      <Stack.Screen name="NewAppointment" component={NewAppointmentScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentsStackNavigator; 