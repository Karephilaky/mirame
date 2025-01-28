import axiosInstance from '../../config/axios';
import { Servicio } from '../../types/database';

export const servicesApi = {
  getServices: async (): Promise<Servicio[]> => {
    try {
      console.log('Fetching services...');
      console.log('Request URL:', axiosInstance.getUri({ url: '/services' }));
      
      const response = await axiosInstance.get('/services');
      
      if (response.data) {
        console.log('Services fetched successfully:', response.data);
        return response.data;
      }
      
      throw new Error('No se recibieron datos del servidor');
    } catch (error: any) {
      console.error('Error fetching services:', {
        error,
        message: error.message,
        isNetworkError: error.isNetworkError,
        response: error.response?.data,
        config: error.config
      });

      if (error.isNetworkError) {
        throw new Error(
          'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.'
        );
      }

      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'No se pudieron cargar los servicios. Por favor, intenta de nuevo.'
      );
    }
  },

  getServiceById: async (id: string): Promise<Servicio> => {
    const response = await axiosInstance.get(`/services/${id}`);
    return response.data;
  },

  createService: async (data: Partial<Servicio>): Promise<Servicio> => {
    const response = await axiosInstance.post('/services', data);
    return response.data;
  },

  updateService: async (id: string, data: Partial<Servicio>): Promise<Servicio> => {
    const response = await axiosInstance.put(`/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/services/${id}`);
  },

  restoreService: async (id: string): Promise<Servicio> => {
    const response = await axiosInstance.patch(`/services/${id}/restore`);
    return response.data;
  },

  getEmployeeServices: async (employeeId: string): Promise<Servicio[]> => {
    const response = await axiosInstance.get(`/employees/${employeeId}/services`);
    return response.data;
  },

  getFeaturedServices: async (): Promise<Servicio[]> => {
    const response = await axiosInstance.get('/services/featured');
    return response.data;
  },

  getServicesByCategory: async (categoryId: string): Promise<Servicio[]> => {
    const response = await axiosInstance.get(`/services/category/${categoryId}`);
    return response.data;
  }
};

export default servicesApi; 