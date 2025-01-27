import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/common';

// Importar pantallas
import AdminHomeScreen from '../screens/Admin/AdminHomeScreen';
import EmployeeHomeScreen from '../screens/Employee/EmployeeHomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarLabel: ({ focused, color }) => {
          let label = '';
          switch (route.name) {
            case 'HomeTab':
              label = 'Inicio';
              break;
            case 'Profile':
              label = 'Perfil';
              break;
            default:
              label = route.name;
          }
          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={AdminHomeScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;