import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import HomeScreen from '../../screens/Home/HomeScreen';
import ClientDashboard from '../screens/Dashboards/ClientDashboard';
import EmployeeDashboard from '../screens/Dashboards/EmployeeDashboard';
import AdminDashboard from '../screens/Dashboards/AdminDashboard';
import NewAppointmentScreen from '../../screens/Appointments/NewAppointmentScreen';
import AppointmentDetailScreen from '../../screens/Appointments/AppointmentDetailScreen';
import ServiceDetailScreen from '../../screens/Services/ServiceDetailScreen';
import ServicesScreen from '../../screens/Services/ServicesScreen';
import AppointmentsScreen from '../../screens/Appointments/AppointmentsScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ClientHome" component={ClientDashboard} />
      <Stack.Screen name="EmployeeHome" component={EmployeeDashboard} />
      <Stack.Screen name="AdminHome" component={AdminDashboard} />
      <Stack.Screen name="NewAppointment" component={NewAppointmentScreen} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator; 