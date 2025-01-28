import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api', // Cambia según tu configuración
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // O AsyncStorage en React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
