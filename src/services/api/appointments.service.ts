import axiosInstance from '../../config/axios';
import { Appointment, Service, Product, Employee, TimeSlot } from '../../types/api.types';
import { Appointment as DatabaseAppointment, Servicio } from '../../types/database';

interface ServiceResponse {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: number;
  isFeatured: boolean;
  createdAt: string;
  deletedAt: string | null;
  store: {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    uniqueCode: string;
    createdAt: string;
    deletedAt: string | null;
  };
}

// Función para convertir la respuesta al tipo Service
const convertToService = (response: ServiceResponse): Service => ({
  ...response,
  price: Number(response.price),
  created_at: response.createdAt,
  updated_at: response.createdAt,
});

// Renombrar appointmentsService a appointmentsApi
export const appointmentsApi = {
  // Obtener servicios disponibles
  getServices: async (): Promise<Service[]> => {
    const { data } = await axiosInstance.get('/services');
    return data.map(convertToService);
  },

  // Obtener productos disponibles
  getProducts: async (): Promise<Product[]> => {
    const { data } = await axiosInstance.get('/products');
    return data;
  },

  // Obtener horarios disponibles para una fecha
  getAvailableSlots: async (date: string, serviceId: number): Promise<string[]> => {
    const { data } = await axiosInstance.get(`/appointments/available-slots`, {
      params: { date, service_id: serviceId }
    });
    return data;
  },

  // Obtener empleados disponibles para un servicio
  getEmployeesForService: async (serviceId: number): Promise<Employee[]> => {
    try {
      const response = await axiosInstance.get(`/services/${serviceId}/employees`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees for service:', error);
      throw error;
    }
  },

  // Obtener disponibilidad de un empleado
  getEmployeeAvailability: async (
    employeeId: number,
    date: string,
    serviceId: number
  ): Promise<TimeSlot[]> => {
    const { data } = await axiosInstance.get(`/employees/${employeeId}/availability`, {
      params: {
        date,
        service_id: serviceId
      }
    });
    return data;
  },

  getUserAppointments: async (userId: string): Promise<Appointment[]> => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/appointments`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Error al cargar las citas'
      );
    }
  },

  createAppointment: async (data: {
    userId: string;
    serviceId: string;
    date: Date;
    time: string;
  }): Promise<Appointment> => {
    try {
      const response = await axiosInstance.post('/appointments', data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Error al crear la cita'
      );
    }
  },

  getUserStats: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/stats`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Error al cargar las estadísticas'
      );
    }
  }
}; 