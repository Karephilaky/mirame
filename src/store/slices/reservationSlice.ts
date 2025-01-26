import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reservation {
  id: string;
  clientId: string;
  date: string;
  service: string;
}

interface ReservationState {
  reservations: Reservation[];
}

const initialState: ReservationState = {
  reservations: [],
};

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(r => r.id !== action.payload);
    },
  },
});

export const { addReservation, removeReservation } = reservationSlice.actions;
export default reservationSlice.reducer;