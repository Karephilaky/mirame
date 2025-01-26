import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date | string, formatStr: string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: es });
};

export const formatAppointmentDate = (date: Date | string): string => {
  return formatDate(date, "EEEE d 'de' MMMM");
}; 