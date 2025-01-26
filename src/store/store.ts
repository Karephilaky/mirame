import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './slices/appointmentsSlice';
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    auth: authReducer,
    services: servicesReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;