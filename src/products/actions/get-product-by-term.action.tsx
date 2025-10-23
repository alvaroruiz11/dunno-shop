import { dunnoApi } from '@/api/dunno-api';
import type { Product } from '../interfaces/product.interface';

export const getProductByTermAction = async (
  term: string
): Promise<Product> => {
  // if (term === 'nuevo') {
  //   return {
  //     id: 'nuevo',
  //     title: '',
  //     price: 0,
  //     slug: '',
  //     description: '',
  //     gender: 'men',
  //     sizes: [],
  //     images: [],
  //     created_at: new Date(),
  //     category: { id: '', name: '' },
  //   };
  // }

  try {
    const { data } = await dunnoApi.get<Product>(`/products/${term}`);
    const images = data.images.map((image) => {
      if (image.includes('http')) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    });
    return { ...data, images };
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching product by term: ${term}`);
  }
};
