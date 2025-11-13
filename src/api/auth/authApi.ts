import axios from 'axios';
import {
  AuthChangePasswordRequest,
  AuthChangePasswordResponse,
  AuthLoginRequest,
  AuthRefreshRequest,
  AuthRegisterRequest,
  AuthTokens,
} from './auth.types';
import { User } from '@/types/Auth';

export class AuthApi {
  API_URL: string;
  constructor(apiUrl) {
    this.API_URL = apiUrl;
  }

  async login(payload: AuthLoginRequest) {
    const response = await axios.post<AuthTokens>(
      `${this.API_URL}/login`,
      payload
    );
    return response.data;
  }
  async refresh(payload: AuthRefreshRequest) {
    const response = await axios.post<AuthTokens>(
      `${this.API_URL}/refresh`,
      payload
    );
    return response.data;
  }
  async register(payload: AuthRegisterRequest) {
    const response = await axios.post<AuthTokens>(
      `${this.API_URL}/register`,
      payload
    );
    return response.data;
  }
  async changePassword(payload: AuthChangePasswordRequest) {
    const response = await axios.post<AuthChangePasswordResponse>(
      `${this.API_URL}/change-password`,
      payload
    );
    return response.data;
  }
  async getProfile() {
    const response = await axios.get<User>(`${this.API_URL}/me`);
    return response.data;
  }
}
