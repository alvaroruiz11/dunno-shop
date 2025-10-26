import { dunnoApi } from '@/api/dunno-api';
import type { User } from '../interfaces/users-response.interface';

export const getUserByIdAction = async (id: string): Promise<User> => {
  try {
    if (id === 'crear') {
      return {
        id: 'crear',
        firstName: '',
        lastName: '',
        email: '',
        createdAt: new Date(),
        isActive: true,
        image: null,
        roles: [],
        shopId: null,
      };
    }

    const { data } = await dunnoApi.get<User>(`/users/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting user with ID: ${id}`);
  }
};
