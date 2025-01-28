import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { authService } from '../services/api/auth.service';
import { setUser, setToken } from '../store/slices/authSlice';
import { LoginDto, RegisterDto, AuthResponse } from '../types/api.types';
import { transformApiUserToStoreUser } from '../utils/transforms';
import { User, UserRole, ROLES } from '../types/database';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      
      const userRole = response.user.id_rol as UserRole;
      
      dispatch(setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        telefono: response.user.telefono || '',
        id_rol: userRole,
        creado_en: new Date(),
        actualizado_en: new Date()
      }));
      
      dispatch(setToken(response.token));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterDto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      
      // Usar la función de transformación
      const transformedUser = transformApiUserToStoreUser(response.user);

      dispatch(setUser(transformedUser));
      dispatch(setToken(response.token));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
  };
};