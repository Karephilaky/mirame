import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Para emulador Android - usa tu IP local real
      return 'http://192.168.100.129:3000';
    } else {
      // Para iOS
      return 'http://localhost:3000';
    }
  }
  return 'https://tu-url-produccion.com';
};

const baseURL = getBaseUrl();
console.log('Base URL configurada:', baseURL);

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000, // Aumentamos el timeout a 30 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor para logs
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('\n--- Iniciando Petición ---');
    console.log('URL:', config.url);
    console.log('Método:', config.method?.toUpperCase());
    console.log('Headers:', config.headers);
    if (config.data) {
      const logData = { ...config.data };
      if (logData.password) logData.password = '***';
      console.log('Datos:', logData);
    }
    return config;
  },
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('\n--- Respuesta Recibida ---');
    console.log('Status:', response.status);
    console.log('Datos:', response.data);
    return response;
  },
  (error) => {
    console.log('\n--- Error en la Petición ---');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Datos:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 