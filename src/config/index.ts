export const API_URL = 'http://localhost:3000/api'; // Cambia esto según tu API

export const API_ENDPOINTS = {
  services: `${API_URL}/services`,
  clients: `${API_URL}/clients`,
  appointments: `${API_URL}/appointments`,
  auth: `${API_URL}/auth`,
} as const;

export const APP_CONFIG = {
  appName: 'Mírame',
  version: '1.0.0',
  defaultLanguage: 'es',
  supportEmail: 'soporte@mirame.com',
} as const; 