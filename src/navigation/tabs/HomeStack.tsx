import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import NewAppointmentScreen from '../../screens/Appointments/NewAppointmentScreen';
import AppointmentDetailScreen from '../../screens/Appointments/AppointmentDetailScreen';
import { HomeStackParamList } from '../types';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewAppointment" component={NewAppointmentScreen} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack; 