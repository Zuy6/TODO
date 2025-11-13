import {
  AuthLoginRequest,
  AuthRefreshRequest,
  AuthRegisterRequest,
  AuthTokens,
} from '@/api/auth/auth.types';
import { AuthApi } from '@/api/auth/authApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Axios, AxiosError } from 'axios';
import { toast } from 'sonner';

type RejectResponse = {
  rejectValue: { error: string };
};

const api = new AuthApi('http://localhost:3001/auth');

export const login = createAsyncThunk<
  AuthTokens,
  AuthLoginRequest,
  RejectResponse
>('auth/login', async (payload) => {
  try {
    const response = await api.login(payload);
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.error);
  }
});

export const refresh = createAsyncThunk<
  AuthTokens,
  AuthRefreshRequest,
  RejectResponse
>('auth/refresh', async (payload) => {
  try {
    const response = await api.refresh(payload);
    return response;
  } catch (error) {
     toast.error(error?.response?.data?.error);
  }
});

export const register = createAsyncThunk<
  AuthTokens,
  AuthRegisterRequest,
  RejectResponse
>('auth/register', async (payload) => {
  try {
    const response = await api.register(payload);
    return response;
  } catch (error) {
     toast.error(error?.response?.data?.error);
  }
});
