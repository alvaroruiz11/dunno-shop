import { dunnoApi } from '@/api/dunno-api';
import type { AuthResponse } from '../interfaces/auth-response.interface';

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await dunnoApi.post<AuthResponse>('/auth/login', {
      email: email,
      password: password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
