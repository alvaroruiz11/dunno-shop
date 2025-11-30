interface Options {
  page?: number;
  limit?: number;
  active?: '0' | '1';
}

import { dunnoApi } from '@/api/dunno-api';
import type { CategoriesResponse } from '../interfaces/categories-response.interface';

export const getCategoriesActions = async (
  options: Options
): Promise<CategoriesResponse> => {
  const { page = 1, limit = 20, active } = options;
  try {
    const { data } = await dunnoApi.get<CategoriesResponse>('/categories', {
      params: {
        page,
        limit,
        active,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting categories');
  }
};
