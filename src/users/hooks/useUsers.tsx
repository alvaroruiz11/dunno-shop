import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getUsersAction } from '../actions/get-users-actions';

export const useUsers = (role?: string) => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;

  const query = useQuery({
    queryKey: ['users', { page, role }],
    queryFn: () =>
      getUsersAction({
        page: isNaN(+page) ? 1 : +page,
        role: role,
      }),
  });

  return {
    ...query,
  };
};
