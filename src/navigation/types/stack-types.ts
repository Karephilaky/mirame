// Tipos para stacks
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type ServiceStackParamList = {
  ServiceList: undefined;
  ServiceDetail: { id: string };
  // ...
};

export type AppointmentStackParamList = {
  AppointmentList: undefined;
  AppointmentDetail: { id: string };
  // ...
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  // ...
}; 