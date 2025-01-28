import api from './api.client';
import { Reserva } from '../../types/database';

export const reservationsApi = {
  getReservations: async (): Promise<Reserva[]> => {
    const response = await api.get('/reservations');
    return response.data;
  },
  // ... otros métodos
}; 