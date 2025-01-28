import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { servicesApi } from '../../services/api/services.service';
import { Servicio } from '../../types/database';

export interface ServicesState {
  items: Servicio[];
  featuredServices: Servicio[];
  selectedService: Servicio | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  items: [],
  featuredServices: [],
  selectedService: null,
  loading: false,
  error: null
};

// Thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const services = await servicesApi.getServices();
    return services;
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await servicesApi.getServiceById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar el servicio');
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (data: Partial<Servicio>) => {
    const service = await servicesApi.createService(data);
    return service;
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, data }: { id: string; data: Partial<Servicio> }) => {
    const service = await servicesApi.updateService(id, data);
    return service;
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id: string) => {
    await servicesApi.deleteService(id);
    return id;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setServices: (state, action: PayloadAction<Servicio[]>) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar servicios';
      })
      // Fetch service by id
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create service
      .addCase(createService.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update service
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id.toString() === action.payload.id.toString());
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete service
      .addCase(deleteService.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id.toString() !== action.payload);
      });
  }
});

export const { clearSelectedService, clearError, setServices } = servicesSlice.actions;
export default servicesSlice.reducer; 