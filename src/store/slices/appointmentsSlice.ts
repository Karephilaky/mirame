import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from '../../types/database';
import { appointmentsApi } from '../../services/api/appointments.service';

export interface AppointmentsState {
  items: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;
  error: string | null;
  stats: {
    totalAppointments: number;
    loyaltyPoints: number;
    completedServices: number;
  };
}

const initialState: AppointmentsState = {
  items: [],
  selectedAppointment: null,
  loading: false,
  error: null,
  stats: {
    totalAppointments: 0,
    loyaltyPoints: 0,
    completedServices: 0
  }
};

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (userId: string) => {
    const appointments = await appointmentsApi.getUserAppointments(userId);
    return appointments;
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (data: { 
    userId: string;
    serviceId: string;
    date: Date;
    time: string;
  }) => {
    const appointment = await appointmentsApi.createAppointment(data);
    return appointment;
  }
);

export const fetchUserStats = createAsyncThunk(
  'appointments/fetchUserStats',
  async (userId: string) => {
    const stats = await appointmentsApi.getUserStats(userId);
    return stats;
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedAppointment: (state, action: PayloadAction<Appointment>) => {
      state.selectedAppointment = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar las citas';
      })
      // Create appointment
      .addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.items = [...state.items, action.payload];
      })
      // Fetch user stats
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  }
});

export const { clearError, setSelectedAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer; 