import { UserRole, ROLES } from '../types/database';

export const getHomeScreenByRole = (role: UserRole): string => {
  switch (role) {
    case ROLES.ADMIN:
      return 'AdminHome';
    case ROLES.EMPLOYEE:
      return 'EmployeeHome';
    case ROLES.CLIENT:
      return 'ClientHome';
    default:
      return 'Login';
  }
};

export const getRoleMessage = (role: UserRole): string => {
  switch (role) {
    case ROLES.ADMIN:
      return '¡Bienvenido Administrador!';
    case ROLES.EMPLOYEE:
      return '¡Bienvenido al portal de empleados!';
    case ROLES.CLIENT:
      return '¡Bienvenido a Mírame!';
    default:
      return '¡Bienvenido!';
  }
}; 