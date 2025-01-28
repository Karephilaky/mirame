import { User } from '../types/database';

export interface RootState {
  auth: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  };
  // Otros estados aquí
} 