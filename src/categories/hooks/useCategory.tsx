import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategoryByIdAction } from '../actions/get-category-by-id.action';
import { createUpdateCategoryAction } from '../actions/create-update-category.action';

export const useCategory = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['category', { id: id }],
    queryFn: () => getCategoryByIdAction(id || ''),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: createUpdateCategoryAction,
    onSuccess: (category) => {
      // Invalidar queries
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({
        queryKey: ['category', { id: category.id }],
      });

      queryClient.setQueryData(['category', { id: category.id }], category);
    },
  });

  return {
    ...query,
    mutation,
  };
};
