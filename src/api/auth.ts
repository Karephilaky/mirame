import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { AuthResponse, User } from '../types/database';

const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la autenticación');
      }

      return response.json();
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  register: async (userData: any): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en el registro');
      }

      return response.json();
    } catch (error) {
      console.error('Error en register:', error);
      throw error;
    }
  },

  requestPasswordReset: async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al solicitar el restablecimiento de contraseña');
      }

      return true;
    } catch (error) {
      console.error('Error en requestPasswordReset:', error);
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) throw new Error('Error al restablecer la contraseña');
      return true;
    } catch (error) {
      console.error('Error en resetPassword:', error);
      throw error;
    }
  },
};

export default authApi; 