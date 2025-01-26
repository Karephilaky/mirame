import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/common';
import DevMenu from '../components/DevMenu';
import { NavigationContainer } from '@react-navigation/native';

// Importar los tipos de navegación
import {
  RootStackParamList,
  AuthStackParamList,
  HomeStackParamList,
  AppointmentStackParamList,
  ClientStackParamList,
  ServiceStackParamList,
  ProfileStackParamList,
  MainTabParamList
} from './types';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';

// Home Screens
import HomeScreen from '../screens/Home/HomeScreen';

// Calendar/Appointments Screens
import CalendarScreen from '../screens/Appointments/CalendarScreen';
import NewAppointmentScreen from '../screens/Appointments/NewAppointmentScreen';
import { AppointmentDetailScreen } from '../screens/Appointments/AppointmentDetailScreen';
import { DayAppointmentsScreen } from '../screens/Appointments/DayAppointmentsScreen';

// Clients Screens
import ClientListScreen from '../screens/Clients/ClientListScreen';
import ClientDetailScreen from '../screens/Clients/ClientDetailScreen';

// Services Screens
import ServiceScreen from '../screens/Services/ServiceScreen';
import ServiceFormScreen from '../screens/Services/ServiceFormScreen';

// Profile Screens
import {
  ProfileScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  BusinessInfoScreen,
  PaymentMethodsScreen,
  SupportScreen
} from '../screens/Profile';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const AppointmentStack = createStackNavigator<AppointmentStackParamList>();
const ClientStack = createStackNavigator<ClientStackParamList>();
const ServiceStack = createStackNavigator<ServiceStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

// Stack Navigator para Auth
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ title: 'Iniciar Sesión' }}
    />
    <AuthStack.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{ title: 'Registro' }}
    />
    <AuthStack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen}
      options={{ title: 'Recuperar Contraseña' }}
    />
  </AuthStack.Navigator>
);

// Stack Navigator para Home
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="NewAppointment" component={NewAppointmentScreen} />
    <HomeStack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
  </HomeStack.Navigator>
);

// Stack Navigator para Appointments
const AppointmentStackNavigator = () => (
  <AppointmentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: COLORS.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <AppointmentStack.Screen 
      name="CalendarMain" 
      component={CalendarScreen}
      options={{ title: 'Calendario' }}
    />
    <AppointmentStack.Screen 
      name="DayAppointments" 
      component={DayAppointmentsScreen}
      options={{ title: 'Citas del Día' }}
    />
    <AppointmentStack.Screen 
      name="AppointmentDetail" 
      component={AppointmentDetailScreen}
      options={{ title: 'Detalles de la Cita' }}
    />
  </AppointmentStack.Navigator>
);

// Stack Navigator para Clients
const ClientStackNavigator = () => (
  <ClientStack.Navigator screenOptions={{ headerShown: false }}>
    <ClientStack.Screen name="ClientList" component={ClientListScreen} />
    <ClientStack.Screen name="ClientDetail" component={ClientDetailScreen} />
    <ClientStack.Screen name="NewAppointment" component={NewAppointmentScreen} />
  </ClientStack.Navigator>
);

// Stack Navigator para Services
const ServiceStackNavigator = () => (
  <ServiceStack.Navigator screenOptions={{ headerShown: false }}>
    <ServiceStack.Screen name="ServiceList" component={ServiceScreen} />
    <ServiceStack.Screen name="ServiceForm" component={ServiceFormScreen} />
  </ServiceStack.Navigator>
);

// Stack Navigator para Profile
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <ProfileStack.Screen name="BusinessInfo" component={BusinessInfoScreen} />
    <ProfileStack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    <ProfileStack.Screen name="Support" component={SupportScreen} />
  </ProfileStack.Navigator>
);

// Tab Navigator Principal
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'home';

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Appointments':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'Clients':
            iconName = focused ? 'people' : 'people-outline';
            break;
          case 'Services':
            iconName = focused ? 'cut' : 'cut-outline';
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
          case 'Home':
            label = 'Inicio';
            break;
          case 'Appointments':
            label = 'Calendario';
            break;
          case 'Clients':
            label = 'Clientes';
            break;
          case 'Services':
            label = 'Servicios';
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
      name="Home" 
      component={HomeStackNavigator}
      options={{
        headerShown: false,
        title: 'Inicio'
      }}
    />
    <Tab.Screen 
      name="Appointments" 
      component={AppointmentStackNavigator}
      options={{ 
        headerShown: false,
        title: 'Citas'
      }}
    />
    <Tab.Screen name="Clients" component={ClientStackNavigator} />
    <Tab.Screen name="Services" component={ServiceStackNavigator} />
    <Tab.Screen 
      name="Profile" 
      component={ProfileStackNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons 
            name={focused ? 'person' : 'person-outline'} 
            size={size} 
            color={color} 
          />
        ),
        tabBarLabel: ({ color }) => (
          <Text style={{ color, fontSize: 12 }}>Perfil</Text>
        ),
      }}
    />
  </Tab.Navigator>
);

// Root Navigator
const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
      {__DEV__ && <DevMenu />}
    </View>
  );
};

export default AppNavigator;