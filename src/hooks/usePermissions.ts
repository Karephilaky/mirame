import { useAppSelector } from './useRedux';
import { ROLES } from '../types/database';

export const usePermissions = () => {
  const { user } = useAppSelector(state => state.auth);

  return {
    isAdmin: user?.id_rol === ROLES.ADMIN,
    isEmployee: user?.id_rol === ROLES.EMPLOYEE,
    isClient: user?.id_rol === ROLES.CLIENT,
    
    canManageServices: user?.id_rol === ROLES.ADMIN,
    canViewServices: true, // Todos pueden ver servicios
    canEditServices: user?.id_rol === ROLES.ADMIN,
    canDeleteServices: user?.id_rol === ROLES.ADMIN,
    
    canManageEmployees: user?.id_rol === ROLES.ADMIN,
    canViewAppointments: true,
    canCreateAppointments: user?.id_rol !== ROLES.ADMIN,
    canManageOwnAppointments: user?.id_rol === ROLES.EMPLOYEE,
  };
}; 