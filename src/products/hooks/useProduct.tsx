import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductByTermAction } from '../actions/get-product-by-term.action';
import { createUpdateProductAction } from '../actions/create-update-product.action';

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['product', { id: id }],
    queryFn: () => getProductByTermAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (data) => {
      // Invalidar cache
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', { id: data.id }] });

      // Actualizar queryData
      queryClient.setQueryData(['product', { id: data.id }], data);
    },
  });

  return { ...query, mutation };
};
