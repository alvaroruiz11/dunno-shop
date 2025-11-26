import { dunnoApi } from '@/api/dunno-api';
import type { Category } from '../interfaces/category.interface';

export const getCategoryByIdAction = async (id: string): Promise<Category> => {
  if (id === 'nuevo') {
    return {
      id: 'nuevo',
      name: '',
      slug: '',
      subCategories: [],
    };
  }

  try {
    const { data } = await dunnoApi.get<Category>(`/categories/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting category by ID: ${id}`);
  }
};
