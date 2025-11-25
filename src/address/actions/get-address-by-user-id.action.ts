import { dunnoApi } from '@/api/dunno-api';
import type { Address } from '../interfaces/address.interface';

export const getAddressByUserId = async (userId: string) => {
  try {
    const { data } = await dunnoApi.get<Address[]>(`/address/user/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting address user');
  }
};
