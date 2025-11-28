import { useQuery } from '@tanstack/react-query';
import { getOrderByIdAction } from '../actions/get-order-by-id.action';

export const useOrder = (id: string) => {
  const query = useQuery({
    queryKey: ['order', { id: id }],
    queryFn: () => getOrderByIdAction(id || ''),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    enabled: !!id,
  });

  return {
    ...query,
  };
};

