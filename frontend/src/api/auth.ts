import apiClient from './apiClient';
import type { AuthResponse, RegisterData, User } from '../types/auth';

export const login = async (username: string, password: string) => {
  const response = await apiClient.post<AuthResponse>('/auth/login/', {
    username,
    password,
  });
  return response.data;
};

export const logout = async () => {
  await apiClient.post('/auth/logout/');
};

export const register = async (data: RegisterData) => {
  const response = await apiClient.post<AuthResponse>('/accounts/register/', data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get<User>('/accounts/users/me/');
  return response.data;
};