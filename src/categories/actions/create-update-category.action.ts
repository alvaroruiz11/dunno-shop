import { dunnoApi } from '@/api/dunno-api';
import type { Category } from '../interfaces/category.interface';

export const createUpdateCategoryAction = async (
  categoryLike: Partial<Category> & {
    parentId?: string;
  }
): Promise<Category> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, subCategories, ...rest } = categoryLike;

  const isCreating = id === 'nuevo';

  try {
    const { data } = await dunnoApi<Category>({
      url: isCreating ? '/categories' : `/categories/${id}`,
      method: isCreating ? 'POST' : 'PATCH',
      data: {
        ...rest,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating/updating category');
  }
};
