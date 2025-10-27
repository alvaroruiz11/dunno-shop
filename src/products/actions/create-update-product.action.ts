/* eslint-disable @typescript-eslint/no-unused-vars */

import { dunnoApi } from '@/api/dunno-api';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (
  productLike: Partial<Product> & {
    files?: File[];
    categoryId?: string;
    discount?: number;
  }
): Promise<Product> => {
  const {
    id,
    images = [],
    files = [],
    createdAt,
    category,
    discount,
    ...rest
  } = productLike;

  const isCreating = id === 'crear';

  rest.price = Number(rest.price || 0);
  rest.costPrice = Number(rest.costPrice || 0);
  // Calcular si viene descuento
  rest.salePrice = discount ? rest.price * (1 - discount / 100) : null;

  // Preparar images
  if (files.length > 0) {
    const newImagesName = await uploadFiles(files);
    images.push(...newImagesName);
  }

  const imageToSave = images.map((image) => {
    if (image.includes('http')) return image.split('/').pop() || '';
    return image;
  });

  const { data } = await dunnoApi<Product>({
    url: isCreating ? '/products' : `/products/${productLike.id}`,
    method: isCreating ? 'POST' : 'PATCH',
    data: {
      ...rest,
      images: imageToSave,
    },
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes('http')) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};

interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await dunnoApi<FileUploadResponse>({
      url: '/files/product',
      method: 'POST',
      data: formData,
    });

    return data.fileName;
  });

  const uploadedFileNames = await Promise.all(uploadPromises);
  return uploadedFileNames;
};
