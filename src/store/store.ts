import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import servicesReducer from './slices/servicesSlice';
import loadingReducer from './slices/loadingSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'services']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedServicesReducer = persistReducer(persistConfig, servicesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    appointments: appointmentsReducer,
    services: persistedServicesReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;