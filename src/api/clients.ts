import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { Cliente } from '../types/database';

const clientsApi = {
  getAll: async (): Promise<Cliente[]> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CLIENTS.BASE}`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener clientes');
      }

      return response.json();
    } catch (error) {
      console.error('Error en getAll clients:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Cliente> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CLIENTS.BY_ID(id)}`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener el cliente');
      }

      return response.json();
    } catch (error) {
      console.error('Error en getById client:', error);
      throw error;
    }
  },

  create: async (clientData: Partial<Cliente>): Promise<Cliente> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CLIENTS.BASE}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el cliente');
      }

      return response.json();
    } catch (error) {
      console.error('Error en create client:', error);
      throw error;
    }
  },

  update: async (id: string, clientData: Partial<Cliente>): Promise<Cliente> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CLIENTS.UPDATE(id)}`, {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el cliente');
      }

      return response.json();
    } catch (error) {
      console.error('Error en update client:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CLIENTS.DELETE(id)}`, {
        method: 'DELETE',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el cliente');
      }
    } catch (error) {
      console.error('Error en delete client:', error);
      throw error;
    }
  },
};

export default clientsApi; 