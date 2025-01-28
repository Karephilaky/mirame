import { AppointmentStatus } from '../types/database';
import { COLORS } from '../constants/colors';

export const getStatusColor = (status: AppointmentStatus | undefined) => {
  switch (status) {
    case 'confirmada':
      return COLORS.success;
    case 'pendiente':
      return COLORS.warning;
    case 'cancelada':
      return COLORS.error;
    case 'completada':
      return COLORS.primary;
    default:
      return COLORS.text;
  }
};

export const getStatusText = (status: AppointmentStatus | undefined) => {
  if (!status) return 'Desconocido';
  return status.charAt(0).toUpperCase() + status.slice(1);
}; 