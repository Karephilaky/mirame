import { API_URL_DEV, API_URL_PROD } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Actualizamos la configuración de la API para usar las variables de entorno
const BASE_URL = __DEV__ ? 'http://localhost:3002/api' : API_URL_PROD;

export const API_CONFIG = {
  BASE_URL,
  TIMEOUT: 10000, // timeout en milisegundos
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  getToken: async () => {
    try {
      return await AsyncStorage.getItem('token') || '';
    } catch (error) {
      console.error('Error getting token:', error);
      return '';
    }
  },
};

// Actualizamos los endpoints para que coincidan con el backend
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    RESTORE: (id: string) => `/users/${id}/restore`,
  },
  ROLES: {
    BASE: '/roles',
    BY_ID: (id: string) => `/roles/${id}`,
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
  },
  STORES: {
    BASE: '/stores',
    BY_ID: (id: string) => `/stores/${id}`,
    UPDATE: (id: string) => `/stores/${id}`,
    DELETE: (id: string) => `/stores/${id}`,
    RESTORE: (id: string) => `/stores/${id}/restore`,
  },
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    RESTORE: (id: string) => `/products/${id}/restore`,
  },
  SERVICES: {
    BASE: '/services',
    BY_ID: (id: string) => `/services/${id}`,
    UPDATE: (id: string) => `/services/${id}`,
    DELETE: (id: string) => `/services/${id}`,
    RESTORE: (id: string) => `/services/${id}/restore`,
  },
  CLIENTS: {
    BASE: '/clients',
    BY_ID: (id: string) => `/clients/${id}`,
    UPDATE: (id: string) => `/clients/${id}`,
    DELETE: (id: string) => `/clients/${id}`,
  },
  RESERVATIONS: {
    BASE: '/reservations',
    BY_ID: (id: string) => `/reservations/${id}`,
    UPDATE: (id: string) => `/reservations/${id}`,
    DELETE: (id: string) => `/reservations/${id}`,
    RESTORE: (id: string) => `/reservations/${id}/restore`,
  },
  EMPLOYEES: {
    BASE: '/employees',
    BY_ID: (id: string) => `/employees/${id}`,
    UPDATE: (id: string) => `/employees/${id}`,
    DELETE: (id: string) => `/employees/${id}`,
    RESTORE: (id: string) => `/employees/${id}/restore`,
  },
  APPOINTMENTS: {
    BASE: '/appointments',
    BY_ID: (id: string) => `/appointments/${id}`,
    UPDATE: (id: string) => `/appointments/${id}`,
    DELETE: (id: string) => `/appointments/${id}`,
    RESTORE: (id: string) => `/appointments/${id}/restore`,
  },
}; 