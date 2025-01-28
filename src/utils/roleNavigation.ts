import { UserRole, ROLES } from '../types/database';

export const getHomeScreenByRole = (role: string): string => {
  switch (role) {
    case '1':
      return 'AdminHome';
    case '2':
      return 'EmployeeHome';
    case '3':
      return 'ClientHome';
    default:
      return 'ClientHome';
  }
};

export const getRoleMessage = (role: string): string => {
  switch (role) {
    case '1':
      return '¡Bienvenido Administrador!';
    case '2':
      return '¡Bienvenido Empleado!';
    case '3':
      return '¡Bienvenido a Mírame!';
    default:
      return '¡Bienvenido!';
  }
}; 