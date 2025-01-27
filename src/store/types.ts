import { User } from '../types/database';

export interface RootState {
  auth: {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  };
  // Otros estados aquí
} 