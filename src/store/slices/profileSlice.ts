import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi, UpdateUserDto } from '../../services/api/users.service';
import { User } from '../../types/database';
import { setUser } from './authSlice';

export interface ProfileState {
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null
};

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, data }: { userId: string | number; data: UpdateUserDto }, { dispatch }) => {
    try {
      const updatedUser = await usersApi.updateProfile(userId, data);
      dispatch(setUser(updatedUser));
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      }
      throw 'Error al actualizar el perfil';
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar el perfil';
      });
  }
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async ({ userId, currentPassword, newPassword }: {
    userId: string | number;
    currentPassword: string;
    newPassword: string;
  }) => {
    await usersApi.changePassword(userId, { currentPassword, newPassword });
  }
); 