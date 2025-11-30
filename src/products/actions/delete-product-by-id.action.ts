import { dunnoApi } from '@/api/dunno-api';
import type { Product } from '../interfaces/product.interface';

export const deleteProductById = async (id: string) => {
  try {
    await dunnoApi.delete<Product>(`/products/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
