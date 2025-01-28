export * from './constants';
export * from './axios';

// Configuración centralizada
export const CONFIG = {
  api: {
    baseUrl: process.env.API_URL || 'http://localhost:3000/api',
    timeout: 15000,
  },
  app: {
    name: 'Mírame',
    version: '1.0.0',
  },
  storage: {
    keys: {
      authToken: '@auth_token',
      userData: '@user_data',
    }
  }
};

export const API_ENDPOINTS = {
  services: `${CONFIG.api.baseUrl}/services`,
  clients: `${CONFIG.api.baseUrl}/clients`,
  appointments: `${CONFIG.api.baseUrl}/appointments`,
  auth: `${CONFIG.api.baseUrl}/auth`,
} as const;

export const APP_CONFIG = {
  appName: 'Mírame',
  version: '1.0.0',
  defaultLanguage: 'es',
  supportEmail: 'soporte@mirame.com',
} as const; 