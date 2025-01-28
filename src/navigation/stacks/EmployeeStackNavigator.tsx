import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeHomeScreen from '../../screens/Employee/EmployeeHomeScreen';

const Stack = createNativeStackNavigator();

const EmployeeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EmployeeHome" component={EmployeeHomeScreen} />
    </Stack.Navigator>
  );
};

export default EmployeeStackNavigator; 