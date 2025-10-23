import { dunnoApi } from '@/api/dunno-api';
import type { AuthResponse } from '../interfaces/auth-response.interface';

export const checkStatusAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  try {
    const { data } = await dunnoApi.get<AuthResponse>('/auth/check-status');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Token expired or not valid');
  }
};
