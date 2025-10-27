import { dunnoApi } from '@/api/dunno-api';
import type { Product } from '../interfaces/product.interface';

export const getProductByTermAction = async (
  term: string
): Promise<Product> => {
  if (term === 'crear') {
    return {
      id: 'crear',
      category: { id: '', name: '' },
      costPrice: 0,
      createdAt: new Date(),
      description: '',
      gender: '',
      images: [],
      price: 0,
      salePrice: 0,
      slug: '',
      tags: [],
      title: '',
      variants: [],
    };
  }
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
