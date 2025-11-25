import { dunnoApi } from '@/api/dunno-api';
import type { Address } from '../interfaces/address.interface';

export const createUpdateAddressAction = async (
  addressLike: Partial<Address> & {
    departmentId?: string;
    provinceId?: string;
    cityId?: string;
  }
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, provinceId, departmentId, userId, department, ...rest } = addressLike;

  const isCreating = id === 'nuevo';

  try {
    const { data } = await dunnoApi<Address>({
      url: isCreating ? '/address' : `/address/${id}`,
      method: isCreating ? 'POST' : 'PATCH',
      data: {
        ...rest,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating/updating address');
  }
};
