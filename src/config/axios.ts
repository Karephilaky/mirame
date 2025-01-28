import axios from 'axios';
import { Platform } from 'react-native';
import { API_CONFIG } from './constants';

const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === 'android' 
      ? 'http://10.0.2.2:3000/api'
      : 'http://localhost:3000/api';
  }
  return API_CONFIG.BASE_URL;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores
axiosInstance.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log('Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('Response:', {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.error('API Error:', {
        message: error.message,
        response: error.response?.data,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 