import api from './api.client';
import { Cliente } from '../../types/database';

export const clientsApi = {
  getClients: async (): Promise<Cliente[]> => {
    const response = await api.get('/clients');
    return response.data;
  },

  getClientById: async (id: string): Promise<Cliente> => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  createClient: async (data: Partial<Cliente>): Promise<Cliente> => {
    const response = await api.post('/clients', data);
    return response.data;
  },

  updateClient: async (id: string, data: Partial<Cliente>): Promise<Cliente> => {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  },

  deleteClient: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`);
  }
}; 