import { dunnoApi } from '@/api/dunno-api';
import type { Category } from '../interfaces/category.interface';

export const getNavigationCategoriesAction = async (): Promise<Category[]> => {
  try {
    const { data } = await dunnoApi.get<Category[]>('/categories/navigation');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting navigation categories');
  }
};
