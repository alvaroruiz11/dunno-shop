/* eslint-disable @typescript-eslint/no-unused-vars */
import { dunnoApi } from '@/api/dunno-api';
import type { User } from '../interfaces/users-response.interface';

export const createUpdateUserAction = async (
  userLike: Partial<User> & {
    password?: string;
    currentPassword?: string;
    password2?: string;
  }
): Promise<User> => {
  const {
    id,
    currentPassword,
    password,
    isActive,
    createdAt,
    shopId,
    password2,
    image,
    ...rest
  } = userLike;

  const isCreating = id === 'crear';

  const formData = isCreating
    ? { ...rest, password }
    : password && currentPassword
    ? { ...rest, currentPassword, password }
    : { ...rest };

  try {
    const { data } = await dunnoApi<User>({
      url: isCreating ? '/users' : `/users/${id}`,
      method: isCreating ? 'POST' : 'PATCH',
      data: formData,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error ${isCreating ? 'creating' : 'updating'} user`);
  }

  // if (isCreating) {
  //   delete userLike.currentPassword;

  //   const { data } = await dunnoApi.post<User>('/users', { userLike });

  //   return data;
  // }

  // const { data } = await dunnoApi.patch<User>(`/users/${id}`);

  // return data;
};
