import axiosInstance from '../../config/axios';
import { Empleado } from '../../types/database';

export const employeesApi = {
  getEmployees: async (): Promise<Empleado[]> => {
    try {
      const response = await axiosInstance.get('/employees');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener empleados');
    }
  },

  getEmployeeById: async (id: string): Promise<Empleado> => {
    try {
      const response = await axiosInstance.get(`/employees/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener empleado');
    }
  },

  updateEmployee: async (id: string, data: Partial<Empleado>): Promise<Empleado> => {
    const response = await axiosInstance.patch(`/employees/${id}`, data);
    return response.data;
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/employees/${id}`);
  },

  restoreEmployee: async (id: string): Promise<void> => {
    await axiosInstance.patch(`/employees/${id}/restore`);
  }
}; 