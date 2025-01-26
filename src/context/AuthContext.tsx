import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse } from '../types/database';
import { authenticateUser, updateUser } from '../services/database';
import { storage } from '../services/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [token, user] = await Promise.all([
        storage.getToken(),
        storage.getUser(),
      ]);

      setState({
        user,
        token,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error cargando autenticación:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authenticateUser(email, password);
      if (response && response.user && response.token) {
        await Promise.all([
          storage.setToken(response.token),
          storage.setUser(response.user),
        ]);

        setState({
          user: response.user,
          token: response.token,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await storage.clearAll();
      setState({ user: null, token: null, isLoading: false });
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      if (!state.user?.id) return false;
      
      // Actualizar en la base de datos
      const success = await updateUser(state.user.id, userData);
      
      if (success) {
        const updatedUser = { ...state.user, ...userData };
        await storage.setUser(updatedUser);
        setState(prev => ({ ...prev, user: updatedUser }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...state,
        isAuthenticated: !!state.user && !!state.token,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {!state.isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
