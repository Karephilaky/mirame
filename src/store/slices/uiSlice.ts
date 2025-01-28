import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  isLoading: boolean;
  error: string | null;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  };
}

const initialState: UiState = {
  isLoading: false,
  error: null,
  toast: {
    message: '',
    type: 'info',
    visible: false
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.toast = {
        ...action.payload,
        visible: true
      };
    },
    hideToast: (state) => {
      state.toast.visible = false;
    }
  }
});

export const { setLoading, setError, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer; 