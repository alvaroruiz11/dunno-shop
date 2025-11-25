import { dunnoApi } from '@/api/dunno-api';
import type { Address } from '../interfaces/address.interface';

export const getAddressByIdAction = async (id: string): Promise<Address> => {
  if (id === 'nuevo') {
    return {
      id: 'nuevo',
      firstName: '',
      lastName: '',
      ci: '',
      address: '',
      phone: '',
      reference: null,
      isDefault: false,
      userId: '',
      department: {
        id: '',
        name: '',
        province: {
          id: '',
          name: '',
          city: {
            id: '',
            name: '',
          },
        },
      },
    };
  }

  try {
    const { data } = await dunnoApi.get<Address>(`/address/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting address by ID');
  }
};
