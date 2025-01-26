import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/common';
import HomeScreen from '../screens/Home/HomeScreen';
import ServiceStackNavigator from '../navigation/ServiceStackNavigator';
import AppointmentStackNavigator from '../navigation/AppointmentStackNavigator';
import ProfileStackNavigator from '../navigation/ProfileStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;
        switch (route.name) {
          case 'HomeTab':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'ServicesTab':
            iconName = focused ? 'list' : 'list-outline';
            break;
          case 'AppointmentsTab':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'ProfileTab':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray,
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeScreen}
      options={{ title: 'Inicio' }}
    />
    <Tab.Screen 
      name="ServicesTab" 
      component={ServiceStackNavigator}
      options={{ title: 'Servicios' }}
    />
    <Tab.Screen 
      name="AppointmentsTab" 
      component={AppointmentStackNavigator}
      options={{ title: 'Citas' }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileStackNavigator}
      options={{ title: 'Perfil' }}
    />
  </Tab.Navigator>
);

export default TabNavigator; 