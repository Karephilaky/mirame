import apiClient from './apiClient';

export const fetchReservations = async () => {
  const response = await apiClient.get('/reservations');
  return response.data;
};