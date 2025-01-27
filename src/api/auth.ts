import axiosInstance from '../config/axios';
import { AuthResponse } from '../types/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface ApiError extends Error {
  name: string;
  message: string;
}

const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      if (data.token) {
        await AsyncStorage.setItem('access_token', data.token);
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Error al iniciar sesión';
        throw new Error(message);
      }
      throw error;
    }
  },

  register: async (registerData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
  }): Promise<AuthResponse> => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/register', registerData);

      if (data.token) {
        await AsyncStorage.setItem('access_token', data.token);
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Error al registrar usuario';
        throw new Error(message);
      }
      throw error;
    }
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      await axiosInstance.post('/api/auth/forgot-password', { email });
    } catch (error) {
      console.error('Error en solicitud de reset:', error);
      throw error;
    }
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    try {
      await axiosInstance.post('/api/auth/reset-password', {
        token,
        password,
      });
    } catch (error) {
      console.error('Error en reset de contraseña:', error);
      throw error;
    }
  },
};

export default authApi; 