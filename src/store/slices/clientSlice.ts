import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  id: string;
  name: string;
  email: string;
}

interface ClientState {
  clients: Client[];
}

const initialState: ClientState = {
  clients: [],
};

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload);
    },
    removeClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter(c => c.id !== action.payload);
    },
  },
});

export const { addClient, removeClient } = clientSlice.actions;
export default clientSlice.reducer;