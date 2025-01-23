import apiClient from './apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

interface UserData {
  email: string;
  password: string;
  // add other fields as needed
}

export const register = async (userData: UserData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};