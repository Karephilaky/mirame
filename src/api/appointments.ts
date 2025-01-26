import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { Appointment } from '../types/database';

const appointmentsApi = {
  getAll: async (): Promise<Appointment[]> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.APPOINTMENTS.BASE}`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener citas');
      }

      return response.json();
    } catch (error) {
      console.error('Error en getAll appointments:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Appointment> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.APPOINTMENTS.BY_ID(id)}`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener la cita');
      }

      return response.json();
    } catch (error) {
      console.error('Error en getById appointment:', error);
      throw error;
    }
  },

  create: async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.APPOINTMENTS.BASE}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear la cita');
      }

      return response.json();
    } catch (error) {
      console.error('Error en create appointment:', error);
      throw error;
    }
  },

  update: async (id: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.APPOINTMENTS.UPDATE(id)}`, {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar la cita');
      }

      return response.json();
    } catch (error) {
      console.error('Error en update appointment:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.APPOINTMENTS.DELETE(id)}`, {
        method: 'DELETE',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar la cita');
      }
    } catch (error) {
      console.error('Error en delete appointment:', error);
      throw error;
    }
  },

  restore: async (id: string): Promise<Appointment> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.APPOINTMENTS.RESTORE(id)}`, {
        method: 'PATCH',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al restaurar la cita');
      }

      return response.json();
    } catch (error) {
      console.error('Error en restore appointment:', error);
      throw error;
    }
  },
};

export default appointmentsApi; 