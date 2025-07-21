import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
  createdAt: string;
}

interface TicketsState {
  tickets: Ticket[];
}

const initialState: TicketsState = {
  tickets: [], // You can populate with dummy data if needed
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets(state, action: PayloadAction<Ticket[]>) {
      state.tickets = action.payload;
    },
    addTicket(state, action: PayloadAction<Ticket>) {
      state.tickets.unshift(action.payload);
    },
    updateTicket(state, action: PayloadAction<Ticket>) {
      const idx = state.tickets.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.tickets[idx] = action.payload;
    },
    deleteTicket(state, action: PayloadAction<number>) {
      state.tickets = state.tickets.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTickets, addTicket, updateTicket, deleteTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer; 