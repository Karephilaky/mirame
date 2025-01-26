import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceListScreen from '../screens/Services/ServiceListScreen';
import ServiceFormScreen from '../screens/Services/ServiceFormScreen';
import { ServiceStackParamList } from './types';

const Stack = createStackNavigator<ServiceStackParamList>();

const ServiceStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ServiceList" component={ServiceListScreen} />
    <Stack.Screen name="ServiceForm" component={ServiceFormScreen} />
  </Stack.Navigator>
);

export default ServiceStackNavigator; 