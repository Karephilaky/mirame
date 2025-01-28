import axiosInstance from '../../config/axios';
import { User } from '../../types/database';

export interface UpdateUserDto {
  name?: string;
  email?: string;
  telefono?: string;
}

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/usuarios');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/usuarios/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put(`/usuarios/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/usuarios/${id}`);
  },

  updateProfile: async (userId: string | number, data: UpdateUserDto): Promise<User> => {
    try {
      const validData = {
        name: data.name,
        email: data.email,
        telefono: data.telefono
      };

      const currentUser = await axiosInstance.get(`/users/${userId}`);
      
      const response = await axiosInstance.put(`/users/${userId}`, {
        ...validData,
        id_rol: currentUser.data.id_rol
      });

      return response.data;
    } catch (error: any) {
      console.error('Update Profile Error:', error);
      throw new Error(
        error.response?.data?.message || 
        'No se pudo actualizar el perfil'
      );
    }
  },

  updateUserRole: async (userId: string | number, roleId: string): Promise<User> => {
    try {
      const response = await axiosInstance.put(`/users/${userId}/role`, {
        roleId
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'No se pudo actualizar el rol del usuario'
      );
    }
  },

  changePassword: async (userId: string | number, data: { 
    currentPassword: string; 
    newPassword: string 
  }): Promise<void> => {
    try {
      await axiosInstance.put(`/users/${userId}/password`, data);
    } catch (error: any) {
      console.log('Change Password Error:', error);
      
      if (error.isNetworkError) {
        throw new Error(error.message);
      }
      
      throw new Error(
        error.message || 
        'No se pudo cambiar la contraseña. Por favor, intenta de nuevo.'
      );
    }
  },

  assignDefaultRole: async (userId: string): Promise<void> => {
    try {
      await axiosInstance.post(`/users/${userId}/role`, {
        roleId: '3' // ID del rol de cliente
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Error al asignar el rol al usuario'
      );
    }
  }
}; 