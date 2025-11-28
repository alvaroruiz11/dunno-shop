import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getOrdersAction } from '../actions/get-orders.action';

export const useOrders = () => {
  // const { gender } = useParams();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;

  const query = useQuery({
    queryKey: ['orders', { page }],
    queryFn: () => getOrdersAction(isNaN(+page) ? 1 : +page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...query,
  };
};
