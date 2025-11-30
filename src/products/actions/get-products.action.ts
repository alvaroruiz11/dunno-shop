import { dunnoApi } from '@/api/dunno-api';
import type { ProductsResponse } from '../interfaces/products-response.interface';

interface Options {
  page?: number;
  limit?: number;
  gender?: string;
  category?: string;
  active?: '0' | '1';
}

export const getProductsAction = async (
  options: Options
): Promise<ProductsResponse> => {
  const { page, limit = 12, gender, category, active } = options;

  const { data } = await dunnoApi.get<ProductsResponse>('/products', {
    params: {
      page,
      limit,
      gender: gender ? gender.toUpperCase() : undefined,
      category,
      active,
    },
  });

  const productsWithImageUrls = data.data.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
    ),
  }));

  return {
    ...data,
    data: productsWithImageUrls,
  };
};
