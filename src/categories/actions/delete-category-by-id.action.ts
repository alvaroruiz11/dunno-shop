import { dunnoApi } from '@/api/dunno-api';
import type { Category } from '../interfaces/category.interface';

export const deleteCategoryById = async (id: string) => {
  try {
    await dunnoApi.delete<Category>(`/categories/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
