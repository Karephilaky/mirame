import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import AuthNavigator from './stacks/AuthNavigator';
import { ClientTabNavigator, EmployeeTabNavigator, AdminTabNavigator } from './tabs/TabNavigators';
import { RootStackParamList } from './types';

// Navegadores
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            {user?.id_rol === '3' && (
              <Stack.Screen name="ClientTabs" component={ClientTabNavigator} />
            )}
            {user?.id_rol === '2' && (
              <Stack.Screen name="EmployeeTabs" component={EmployeeTabNavigator} />
            )}
            {user?.id_rol === '1' && (
              <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;