import api from './api.client';
import { Producto } from '../../types/database';

export const productsApi = {
  getProducts: async (): Promise<Producto[]> => {
    const response = await api.get('/products');
    return response.data;
  },
  // ... otros métodos
}; 