import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportStackParamList } from './types';
import ReportsScreen from '../screens/Admin/ReportsScreen';

const Stack = createNativeStackNavigator<ReportStackParamList>();

const ReportStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Reports" component={ReportsScreen} />
    </Stack.Navigator>
  );
};

export default ReportStackNavigator; 