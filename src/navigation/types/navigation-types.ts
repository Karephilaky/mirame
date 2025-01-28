// Tipos compuestos y props de navegación
import { NavigatorScreenParams, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AuthStackParamList } from './stack-types';
import { ClientTabParamList, EmployeeTabParamList, AdminTabParamList } from './tab-types';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  ClientTabs: NavigatorScreenParams<ClientTabParamList>;
  EmployeeTabs: NavigatorScreenParams<EmployeeTabParamList>;
  AdminTabs: NavigatorScreenParams<AdminTabParamList>;
  ServiceList: undefined;
  ServiceDetail: { id: string };
  AppointmentList: undefined;
  AppointmentDetail: { id: string };
  Profile: undefined;
  EditProfile: undefined;
  NewAppointment: undefined;
};

export type AuthNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;
export type ClientNavigationProp = StackNavigationProp<RootStackParamList, 'ClientTabs'>;
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ClientTabParamList>,
  StackNavigationProp<RootStackParamList>
>;
// ... otros tipos de navegación 