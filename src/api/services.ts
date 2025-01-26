import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { Servicio } from '../types/database';

const servicesApi = {
  getAll: async (): Promise<Servicio[]> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BASE}`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener servicios');
      }

      return response.json();
    } catch (error) {
      console.error('Error en getAll services:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Servicio> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BY_ID(id)}`);
      if (!response.ok) throw new Error('Error al obtener el servicio');
      return response.json();
    } catch (error) {
      console.error('Error en getById service:', error);
      throw error;
    }
  },

  create: async (serviceData: Partial<Servicio>): Promise<Servicio> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BASE}`, {
        method: 'POST',
        headers: {
          ...API_CONFIG.HEADERS,
          'Authorization': `Bearer ${await API_CONFIG.getToken()}`,
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el servicio');
      }

      return response.json();
    } catch (error) {
      console.error('Error en create service:', error);
      throw error;
    }
  },

  update: async (id: string, serviceData: Partial<Servicio>): Promise<Servicio> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BY_ID(id)}`, {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el servicio');
      }

      return response.json();
    } catch (error) {
      console.error('Error en update service:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.DELETE(id)}`, {
        method: 'DELETE',
        headers: {
          ...API_CONFIG.HEADERS,
          'Authorization': `Bearer ${await API_CONFIG.getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el servicio');
      }
    } catch (error) {
      console.error('Error en delete service:', error);
      throw error;
    }
  },

  toggleActive: async (id: string, active: boolean): Promise<Servicio> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BY_ID(id)}/toggle`, {
        method: 'PATCH',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({ active }),
      });
      if (!response.ok) throw new Error('Error al cambiar el estado del servicio');
      return response.json();
    } catch (error) {
      console.error('Error en toggleActive service:', error);
      throw error;
    }
  },
};

export default servicesApi; 