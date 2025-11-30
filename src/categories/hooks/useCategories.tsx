import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getCategoriesActions } from '../actions/get-categories.action';

export const useCategories = (active?: '0' | '1') => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;

  const { data, ...rest } = useQuery({
    queryKey: ['categories', { page: page, active }],
    queryFn: () =>
      getCategoriesActions({ page: isNaN(+page) ? 1 : +page, active: active }),
    staleTime: 1000 * 60 * 5, //  5minutos
  });

  return {
    categories: data?.data,
    totalPages: data?.mata.totalPages,
    ...rest,
  };
};
