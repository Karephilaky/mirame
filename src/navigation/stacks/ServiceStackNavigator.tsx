import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ServiceStackParamList } from '../types/stack-types';
import ServiceListScreen from '../../screens/Services/ServiceListScreen';
import ServiceDetailScreen from '../../screens/Services/ServiceDetailScreen';

const Stack = createStackNavigator<ServiceStackParamList>();

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ServiceList" component={ServiceListScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator; 