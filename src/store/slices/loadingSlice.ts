import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  loading: boolean;
  error: string | null;
}

const initialState: LoadingState = {
  loading: false,
  error: null,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError } = loadingSlice.actions;
export default loadingSlice.reducer; 