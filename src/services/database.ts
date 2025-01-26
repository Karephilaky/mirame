import { User, Cliente, Empleado, Servicio, Tienda, Reserva, AuthResponse } from '../types/database';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';

// Función auxiliar para manejar errores
const handleError = (error: any) => {
  console.error('Error en la petición:', error);
  throw error;
};

// Función auxiliar para hacer peticiones
const fetchAPI = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    headers: API_CONFIG.HEADERS,
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la petición');
    }
    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

// Funciones para Users
export const getUserById = async (id: string): Promise<User | null> => {
  return fetchAPI(API_ENDPOINTS.USERS.BY_ID(id));
};

export const createUser = async (userData: Omit<User, 'id' | 'creado_en' | 'actualizado_en'>): Promise<User | null> => {
  return fetchAPI(API_ENDPOINTS.USERS.BASE, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<boolean> => {
  try {
    const response = await fetchAPI(API_ENDPOINTS.USERS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.success;
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return false;
  }
};

// Funciones para autenticación
export const authenticateUser = async (email: string, password: string): Promise<AuthResponse | null> => {
  try {
    const response = await fetchAPI(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (error) {
    console.error('Error de autenticación:', error);
    return null;
  }
};

// Funciones para Clients
export const getClientById = async (id: string): Promise<Cliente | null> => {
  return fetchAPI(API_ENDPOINTS.CLIENTS.BY_ID(id));
};

// Funciones para Employees
export const getEmployeeById = async (id: string): Promise<Empleado | null> => {
  return fetchAPI(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
};

// Funciones para Services
export const getServices = async (): Promise<Servicio[]> => {
  return fetchAPI(API_ENDPOINTS.SERVICES.BASE);
};

export const getServiceById = async (id: string): Promise<Servicio | null> => {
  return fetchAPI(API_ENDPOINTS.SERVICES.BY_ID(id));
};

// Funciones para Reservations
export const createReservation = async (reserva: Omit<Reserva, 'id' | 'creado_en'>): Promise<boolean> => {
  try {
    const response = await fetchAPI(API_ENDPOINTS.RESERVATIONS.BASE, {
      method: 'POST',
      body: JSON.stringify(reserva),
    });
    return response.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getReservationById = async (id: string): Promise<Reserva | null> => {
  return fetchAPI(API_ENDPOINTS.RESERVATIONS.BY_ID(id));
};

// Funciones para Appointments
export const getAppointments = async (): Promise<Reserva[]> => {
  return fetchAPI(API_ENDPOINTS.APPOINTMENTS.BASE);
};

export const createAppointment = async (appointment: any): Promise<boolean> => {
  try {
    const response = await fetchAPI(API_ENDPOINTS.APPOINTMENTS.BASE, {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
    return response.success;
  } catch (error) {
    console.error('Error creating appointment:', error);
    return false;
  }
}; 