import { dunnoApi } from '@/api/dunno-api';
import type { AuthResponse } from '../interfaces/auth-response.interface';

export interface FormLike {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const registerAction = async ({
  firstName,
  lastName,
  email,
  password,
}: FormLike): Promise<AuthResponse> => {
  try {
    const { data } = await dunnoApi.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
