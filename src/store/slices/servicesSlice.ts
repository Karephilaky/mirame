import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Servicio } from '../../types/database';

interface ServicesState {
  services: Servicio[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  isLoading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Servicio[]>) => {
      state.services = action.payload;
    },
    addService: (state, action: PayloadAction<Servicio>) => {
      state.services.push(action.payload);
    },
    updateService: (state, action: PayloadAction<Servicio>) => {
      const index = state.services.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    deleteService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter(s => s.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setServices,
  addService,
  updateService,
  deleteService,
  setLoading,
  setError,
} = servicesSlice.actions;

export default servicesSlice.reducer; 