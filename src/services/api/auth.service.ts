import axiosInstance from '../../config/axios';
import { User, ROLES } from '../../types/database';

interface LoginResponse {
  user: User;
  token: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    telefono?: string;
  }): Promise<LoginResponse> => {
    try {
      // Registrar usuario con rol de cliente
      const registerData = {
        ...userData,
        id_rol: ROLES.CLIENT
      };

      const response = await axiosInstance.post('/auth/register', registerData);

      // Si el registro fue exitoso, intentar login
      return await authApi.login(userData.email, userData.password);
    } catch (error: any) {
      console.error('Register Error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Error al registrar el usuario'
      );
    }
  },

  verifyToken: async (token: string): Promise<User> => {
    try {
      const response = await axiosInstance.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Token inválido');
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al procesar la solicitud');
    }
  },
}; 