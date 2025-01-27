import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000'; // Sin /api al final
    } else {
      return 'http://localhost:3000'; // Sin /api al final
    }
  }
  return 'https://tu-url-produccion.com';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  TIMEOUT: 30000, // Aumentamos el timeout a 30 segundos
};

// Actualizamos los endpoints para que coincidan con el backend
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
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