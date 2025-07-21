import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import ticketsReducer from '../slices/ticketsSlice';


export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 