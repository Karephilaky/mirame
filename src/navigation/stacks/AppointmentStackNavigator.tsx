import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppointmentStackParamList } from '../types/stack-types';
import AppointmentListScreen from '../../screens/Appointments/AppointmentListScreen';
import AppointmentDetailScreen from '../../screens/Appointments/AppointmentDetailScreen';

const Stack = createStackNavigator<AppointmentStackParamList>();

const AppointmentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AppointmentList" component={AppointmentListScreen} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentStackNavigator; 