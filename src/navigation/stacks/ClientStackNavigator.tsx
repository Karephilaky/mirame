import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClientHome" component={HomeScreen} />
      <Stack.Screen name="ClientProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ClientStackNavigator; 