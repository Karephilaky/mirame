import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistPartial } from 'redux-persist/es/persistReducer';

// Importar reducers y sus tipos
import authReducer, { AuthState } from './slices/authSlice';
import servicesReducer, { ServicesState } from './slices/servicesSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import type { AppointmentsState } from './slices/appointmentsSlice';
import profileReducer, { ProfileState } from './slices/profileSlice';
import uiReducer, { UiState } from './slices/uiSlice';

// Definir el tipo del estado raíz
export interface RootState {
  auth: AuthState;
  services: ServicesState;
  appointments: AppointmentsState;
  profile: ProfileState;
  ui: UiState;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'services']
};

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
  appointments: appointmentsReducer,
  profile: profileReducer,
  ui: uiReducer
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['auth.user.creado_en', 'auth.user.actualizado_en'],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>; 