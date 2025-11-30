import { useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProductsAction } from '../actions/get-products.action';

export const useProducts = (category?: string, active?: '0' | '1') => {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;

  const { data, isLoading } = useQuery({
    queryKey: ['products', { page, gender, category, active }],
    queryFn: () =>
      getProductsAction({
        page: isNaN(+page) ? 1 : +page,
        gender,
        category,
        active,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    // Properties
    products: data?.data,
    isLoading: isLoading,
    totalPages: data?.meta?.totalPages,
  };
};
