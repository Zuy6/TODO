import { User } from '@/types/Auth';

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthRefreshRequest = {
  refreshToken: string;
};

export type AuthRegisterRequest = Pick<User, 'email' | 'age'> & {
  password: string;
};

export type AuthChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type AuthChangePasswordResponse = {
  success: boolean;
  message: string;
};
