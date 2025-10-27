// interface Options {
//   page?: number;
//   limit?: number;
// }

import { dunnoApi } from '@/api/dunno-api';
import type { CategoriesResponse } from '../interfaces/categories-response.interface';

export const getCategoriesActions = async (
  page: number = 1,
  limit: number = 20
): Promise<CategoriesResponse> => {
  try {
    const { data } = await dunnoApi.get<CategoriesResponse>('/categories', {
      params: {
        page,
        limit,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting categories');
  }
};
