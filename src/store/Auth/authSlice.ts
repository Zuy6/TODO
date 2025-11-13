import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from './actionCreatorsAuth';

export type AuthStatus = 'idle' | 'loading' | 'failed';
export type AuthState = {
  user: {
    id: number;
    email: string;
    age?: number;
  } | null;
  token: string | null;
  status: AuthStatus;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.status = 'idle';
        localStorage.setItem('accessToken', state.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.token = null;
      });
    builder
      .addCase(register.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
