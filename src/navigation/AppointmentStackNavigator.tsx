import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentListScreen from '../screens/Appointments/AppointmentListScreen';

const Stack = createNativeStackNavigator();

const AppointmentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppointmentList" component={AppointmentListScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentStackNavigator; 