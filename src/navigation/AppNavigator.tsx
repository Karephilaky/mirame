import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { ROLES } from '../types/database';
import { MainTabParamList } from './types';
import DevMenu from '../components/DevMenu';

import {
  HomeStackNavigator,
  AuthNavigator,
  ServiceStackNavigator,
  AppointmentStackNavigator,
  ClientStackNavigator,
  EmployeeStackNavigator,
  ReportStackNavigator,
  ProfileStackNavigator
} from './';

const Tab = createBottomTabNavigator<MainTabParamList>();

const AppNavigator = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (!user || !token) {
    return <AuthNavigator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          // ... otras opciones
        }}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        
        {user.id_rol === ROLES.ADMIN && (
          <>
            <Tab.Screen name="Services" component={ServiceStackNavigator} />
            <Tab.Screen name="AdminEmployees" component={EmployeeStackNavigator} />
            <Tab.Screen name="AdminReports" component={ReportStackNavigator} />
          </>
        )}

        {user.id_rol === ROLES.EMPLOYEE && (
          <>
            <Tab.Screen name="Appointments" component={AppointmentStackNavigator} />
            <Tab.Screen name="EmployeeClients" component={ClientStackNavigator} />
          </>
        )}

        {user.id_rol === ROLES.CLIENT && (
          <>
            <Tab.Screen name="ClientAppointments" component={AppointmentStackNavigator} />
            <Tab.Screen name="Services" component={ServiceStackNavigator} />
          </>
        )}

        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
      {__DEV__ && <DevMenu />}
    </View>
  );
};

export default AppNavigator;