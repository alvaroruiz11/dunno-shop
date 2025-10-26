import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserByIdAction } from '../actions/get-user-by-id.action';
import { createUpdateUserAction } from '../actions/create-update-user.action';
import type { User } from '../interfaces/users-response.interface';

export const useUser = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user', { id: id }],
    queryFn: () => getUserByIdAction(id || ''),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateUserAction,
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      queryClient.invalidateQueries({
        queryKey: ['user', { id: user.id }],
      });

      queryClient.setQueryData(['user', { id: user.id }], user);
    },
  });

  return {
    ...query,
    mutation,
  };
};
