import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { Empleado } from '../types/database';

const employeesApi = {
  getAll: async (): Promise<Empleado[]> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.EMPLOYEES.BASE}`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener empleados');
      }

      return response.json();
    } catch (error) {
      console.error('Error en getAll employees:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Empleado> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.EMPLOYEES.BY_ID(id)}`, {
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener el empleado');
      }

      return response.json();
    } catch (error) {
      console.error('Error en getById employee:', error);
      throw error;
    }
  },

  create: async (employeeData: Partial<Empleado>): Promise<Empleado> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.EMPLOYEES.BASE}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el empleado');
      }

      return response.json();
    } catch (error) {
      console.error('Error en create employee:', error);
      throw error;
    }
  },

  update: async (id: string, employeeData: Partial<Empleado>): Promise<Empleado> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.EMPLOYEES.UPDATE(id)}`, {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el empleado');
      }

      return response.json();
    } catch (error) {
      console.error('Error en update employee:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.EMPLOYEES.DELETE(id)}`, {
        method: 'DELETE',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el empleado');
      }
    } catch (error) {
      console.error('Error en delete employee:', error);
      throw error;
    }
  },

  restore: async (id: string): Promise<Empleado> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.EMPLOYEES.RESTORE(id)}`, {
        method: 'PATCH',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al restaurar el empleado');
      }

      return response.json();
    } catch (error) {
      console.error('Error en restore employee:', error);
      throw error;
    }
  },
};

export default employeesApi; 