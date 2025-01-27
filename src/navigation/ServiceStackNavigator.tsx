import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceListScreen from '../screens/Services/ServiceListScreen';
import ServiceFormScreen from '../screens/Services/ServiceFormScreen';
import { ServiceStackParamList } from './types';

const Stack = createNativeStackNavigator();

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServiceList" component={ServiceListScreen} />
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator;