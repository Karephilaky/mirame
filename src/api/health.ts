import { API_CONFIG } from '../config/api';

const healthApi = {
  check: async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        throw new Error('Error conectando con el servidor');
      }

      return response.json();
    } catch (error) {
      console.error('Error en health check:', error);
      throw error;
    }
  },
};

export default healthApi; 