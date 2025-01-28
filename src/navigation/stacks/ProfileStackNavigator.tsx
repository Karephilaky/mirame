import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import EditProfileScreen from '../../screens/Profile/EditProfileScreen';
import ChangePasswordScreen from '../../screens/Profile/ChangePasswordScreen';
import BusinessInfoScreen from '../../screens/Profile/BusinessInfoScreen';
import PaymentMethodsScreen from '../../screens/Profile/PaymentMethodsScreen';
import SupportScreen from '../../screens/Profile/SupportScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="BusinessInfo" component={BusinessInfoScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator; 