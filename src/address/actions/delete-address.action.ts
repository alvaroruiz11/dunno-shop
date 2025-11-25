import { dunnoApi } from '@/api/dunno-api';
import type { Address } from '../interfaces/address.interface';

export const deleteAddressAction = async (id: string): Promise<Address> => {
  try {
    const { data } = await dunnoApi.delete<Address>(`/address/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error deleting address with id: ${id}`);
  }
};
