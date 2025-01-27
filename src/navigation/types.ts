import { NavigationProp, CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AdminStackParamList = {
  Home: undefined;
  Employees: undefined;
  Reports: undefined;
  Settings: undefined;
  Services: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Appointments: undefined;
  Clients: undefined;
  Services: undefined;
  Admin: NavigatorScreenParams<AdminStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Services: undefined;
  Profile: undefined;
  // Admin screens
  AdminEmployees: undefined;
  AdminReports: undefined;
  // Employee screens
  EmployeeClients: undefined;
  // Client screens
  ClientAppointments: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  NewAppointment: { appointmentId?: string };
  AppointmentDetail: { appointmentId: string };
};

export type AppointmentStackParamList = {
  CalendarMain: undefined;
  DayAppointments: { date: string };
  AppointmentDetail: { appointmentId: string };
  NewAppointment: { appointmentId?: string };
  ClientDetail: { clientId: string };
};

export type ClientStackParamList = {
  ClientList: undefined;
  ClientDetail: { clientId: string };
  NewAppointment: { clientId: string };
};

export type ServiceFormScreenParams = {
  serviceId?: string;
};

export type ServiceStackParamList = {
  ServiceList: undefined;
  ServiceForm: ServiceFormScreenParams;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  BusinessInfo: undefined;
  PaymentMethods: undefined;
  Support: undefined;
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList>,
    NavigationProp<RootStackParamList>
  >
>;

export type AppointmentScreenNavigationProp = NavigationProp<AppointmentStackParamList>;

export type TabScreenNavigationProp = NavigationProp<MainTabParamList>;
export type ProfileScreenNavigationProp = NavigationProp<ProfileStackParamList>;
export type ServiceScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ServiceStackParamList>,
  NavigationProp<RootStackParamList>
>;

export type CompositeHomeScreenNavigationProp = CompositeNavigationProp<
  NavigationProp<HomeStackParamList>,
  NavigationProp<MainTabParamList>
>;

export type CompositeProfileScreenNavigationProp = CompositeNavigationProp<
  NavigationProp<ProfileStackParamList>,
  CompositeNavigationProp<
    NavigationProp<MainTabParamList>,
    NavigationProp<RootStackParamList>
  >
>;

export type ReportStackParamList = {
  Reports: undefined;
  ReportDetail: { reportId: string };
}; 