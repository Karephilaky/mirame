import api from './api.client';
import { Tienda } from '../../types/database';

export const storesApi = {
  getStores: async (): Promise<Tienda[]> => {
    const response = await api.get('/stores');
    return response.data;
  },
  // ... otros métodos
}; 