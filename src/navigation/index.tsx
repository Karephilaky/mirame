import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import { ClientTabNavigator, EmployeeTabNavigator, AdminTabNavigator } from './tabs/TabNavigators';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
   
      <Stack.Screen name="ClientTabs" component={ClientTabNavigator} />
      <Stack.Screen name="EmployeeTabs" component={EmployeeTabNavigator} />
      <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator; 