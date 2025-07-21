import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'CUSTOMER' | 'AGENT' | 'ADMIN';

interface AuthState {
  user: string | null;
  token: string | null;
  role: UserRole | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: string; token: string; role: UserRole }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
    },
    setUser(state, action: PayloadAction<{ user: string; role: UserRole }>) {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer; 