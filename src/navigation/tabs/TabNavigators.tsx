import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { View, Text } from 'react-native';

// Importaciones de pantallas del Cliente
import ClientHomeScreen from '../../screens/Home/ClientHomeScreen';
import ServiceListScreen from '../../screens/Services/ServiceListScreen';
import AppointmentListScreen from '../../screens/Appointments/AppointmentListScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';

// Importaciones de pantallas del Empleado
import EmployeeHomeScreen from '../../screens/Home/EmployeeHomeScreen';
import ScheduleScreen from '../../screens/Employee/ScheduleScreen';
import ClientListScreen from '../../screens/Clients/ClientListScreen';

import { 
  ClientTabParamList, 
  EmployeeTabParamList, 
  AdminTabParamList 
} from '../types/tab-types';

import AdminHomeScreen from '../../screens/Admin/AdminHomeScreen';
import ManageServicesScreen from '../../screens/Admin/ManageServicesScreen';
import ManageEmployeesScreen from '../../screens/Admin/ManageEmployeesScreen';
import ReportsScreen from '../../screens/Admin/ReportsScreen';
import SettingsScreen from '../../screens/Admin/SettingsScreen';

const ClientTab = createBottomTabNavigator<ClientTabParamList>();
const EmployeeTab = createBottomTabNavigator<EmployeeTabParamList>();
const AdminTab = createBottomTabNavigator<AdminTabParamList>();

// Componente temporal para pantallas en desarrollo
const TempScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Pantalla en desarrollo</Text>
  </View>
);

export const ClientTabNavigator = () => (
  <ClientTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Services':
            iconName = focused ? 'grid' : 'grid-outline';
            break;
          case 'Appointments':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help-outline';
        }
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray,
    })}
  >
    <ClientTab.Screen name="Home" component={ClientHomeScreen} options={{ title: 'Inicio' }} />
    <ClientTab.Screen name="Services" component={ServiceListScreen} options={{ title: 'Servicios' }} />
    <ClientTab.Screen name="Appointments" component={AppointmentListScreen} options={{ title: 'Citas' }} />
    <ClientTab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
  </ClientTab.Navigator>
);

export const EmployeeTabNavigator = () => (
  <EmployeeTab.Navigator>
    <EmployeeTab.Screen 
      name="Dashboard"
      component={EmployeeHomeScreen} 
      options={{ title: 'Inicio' }}
    />
    <EmployeeTab.Screen 
      name="Schedule" 
      component={ScheduleScreen} 
      options={{ title: 'Agenda' }}
    />
    <EmployeeTab.Screen 
      name="Clients" 
      component={ClientListScreen} 
      options={{ title: 'Clientes' }}
    />
    <EmployeeTab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ title: 'Perfil' }}
    />
  </EmployeeTab.Navigator>
);

export const AdminTabNavigator = () => (
  <AdminTab.Navigator>
    <AdminTab.Screen 
      name="Dashboard"
      component={AdminHomeScreen} 
      options={{ title: 'Inicio' }}
    />
    <AdminTab.Screen 
      name="Services" 
      component={ManageServicesScreen} 
      options={{ title: 'Servicios' }}
    />
    <AdminTab.Screen 
      name="Employees" 
      component={ManageEmployeesScreen} 
      options={{ title: 'Empleados' }}
    />
    <AdminTab.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{ title: 'Configuración' }}
    />
  </AdminTab.Navigator>
); 