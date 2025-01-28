import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ServiceStackParamList } from '../types';
import ServicesScreen from '../../screens/Services/ServicesScreen';
import ServiceDetailScreen from '../../screens/Services/ServiceDetailScreen';

const Stack = createNativeStackNavigator<ServiceStackParamList>();

const ServicesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServiceList" component={ServicesScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
    </Stack.Navigator>
  );
};

export default ServicesStackNavigator; 