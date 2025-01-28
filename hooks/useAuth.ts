import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import api from "../services/api";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función de Login
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null); // Reinicia el error

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.status === 200 && response.data.token) {
        // Guarda el token en AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);
      } else {
        throw new Error('Credenciales inválidas o respuesta inesperada del servidor');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función de Registro
  const register = async (
    name: string,
    email: string,
    password: string,
    telefono: string,
    role: string
  ): Promise<void> => {
    setLoading(true);
    setError(null); // Reinicia el error

    try {
      const response = await api.post('/auth/register', { name, email, password, telefono, role });

      if (response.status === 201) {
        // Registro exitoso; opcionalmente puedes guardar un token o navegar automáticamente
        console.log('Registro exitoso');
      } else {
        throw new Error('Error inesperado al registrarse');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrarse';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Función de Logout (opcional)
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Sesión cerrada');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return { loading, error, login, register, logout };
};
