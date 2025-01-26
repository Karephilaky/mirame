import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentListScreen from '../screens/Appointments/AppointmentListScreen';
import AppointmentFormScreen from '../screens/Appointments/AppointmentFormScreen';
import { AppointmentStackParamList } from './types';

const Stack = createStackNavigator<AppointmentStackParamList>();

const AppointmentStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DayAppointments" component={AppointmentListScreen} />
    <Stack.Screen name="NewAppointment" component={AppointmentFormScreen} />
    <Stack.Screen 
      name="AppointmentDetail" 
      component={AppointmentListScreen} 
      initialParams={{ appointmentId: '1' }}
    />
  </Stack.Navigator>
);

export default AppointmentStackNavigator; 