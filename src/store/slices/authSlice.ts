import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../types/database';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/api/auth.service';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      // Guardar token en AsyncStorage
      if (action.payload) {
        AsyncStorage.setItem('token', action.payload).catch(console.error);
      } else {
        AsyncStorage.removeItem('token').catch(console.error);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Limpiar token de AsyncStorage
      AsyncStorage.removeItem('token').catch(console.error);
    },
  },
});

export const { setUser, setToken, setLoading, logout } = authSlice.actions;

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials.email, credentials.password);
      
      // Verificar que el usuario tenga un rol válido
      if (!response.user.id_rol) {
        return rejectWithValue('El usuario no tiene un rol asignado');
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export default authSlice.reducer;