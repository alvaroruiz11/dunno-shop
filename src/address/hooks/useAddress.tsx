import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAddressByIdAction } from '../actions/get-address-by-id.action';
import { createUpdateAddressAction } from '../actions/create-update-address.action';

export const useAddress = (id: string) => {
  const queryClint = useQueryClient();

  const query = useQuery({
    queryKey: ['address', { id: id }],
    queryFn: () => getAddressByIdAction(id || ''),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: createUpdateAddressAction,
    onSuccess: (address) => {
      queryClint.invalidateQueries({ queryKey: ['addresses'] });
      queryClint.invalidateQueries({
        queryKey: ['address', { id: address.id }],
      });

      queryClint.setQueryData(['address', { id: address.id }], address);
    },
  });

  return {
    ...query,
    mutation,
  };
};
