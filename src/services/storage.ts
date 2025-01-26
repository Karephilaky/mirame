import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/database';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
};

export const storage = {
  async setToken(token: string) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error guardando token:', error);
    }
  },

  async getToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  },

  async setUser(user: User) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
    } catch (error) {
      console.error('Error limpiando storage:', error);
    }
  },
}; 