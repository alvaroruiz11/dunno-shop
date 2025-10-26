import { dunnoApi } from '@/api/dunno-api';
import type { UsersResponse } from '../interfaces/users-response.interface';

interface Options {
  page?: number;
  limit?: number;
  role?: string;
  active?: string;
  query?: string;
}

export const getUsersAction = async (
  options: Options
): Promise<UsersResponse> => {
  const { page = 1, limit = 10, role, active, query } = options;
  try {
    const { data } = await dunnoApi.get<UsersResponse>('/users', {
      params: {
        page,
        limit,
        role,
        active,
        q: query,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting users');
  }
};
